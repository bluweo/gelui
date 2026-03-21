import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useBackground, type BgOption, type BgType, COLOR_BACKGROUNDS } from "@/components/context/BackgroundContext";
import { useDraggableModal } from "@/components/hooks/useDraggableModal";
import { Gallery, Video, Colorfilter, TickCircle, VideoPlay } from "iconsax-react";

type TabKey = "image" | "video" | "color";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "image", label: "Image", icon: <Gallery size={14} color="currentColor" variant="Linear" /> },
  { key: "video", label: "Video", icon: <Video size={14} color="currentColor" variant="Linear" /> },
  { key: "color", label: "Color", icon: <Colorfilter size={14} color="currentColor" variant="Linear" /> },
];

export function BackgroundPicker() {
  const { pickerOpen, closePicker, setBg, currentBgId, currentBgType } = useBackground();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("image");
  const [imageBackgrounds, setImageBackgrounds] = useState<BgOption[]>([]);
  const [videoBackgrounds, setVideoBackgrounds] = useState<BgOption[]>([]);
  const [loading, setLoading] = useState(false);

  /* Detect current theme to filter backgrounds */
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const check = () =>
      setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => { setMounted(true); }, []);

  /* When picker opens, set the active tab to match current background type */
  useEffect(() => {
    if (pickerOpen) {
      setActiveTab(currentBgType === "video" ? "video" : currentBgType === "color" ? "color" : "image");
    }
  }, [pickerOpen, currentBgType]);

  /* Fetch backgrounds from both APIs when picker opens */
  useEffect(() => {
    if (!pickerOpen) return;
    setLoading(true);

    Promise.all([
      fetch("/api/backgrounds")
        .then((res) => res.json())
        .then((data: BgOption[]) => data.map((bg) => ({ ...bg, type: "image" as const }))),
      fetch("/api/video-backgrounds")
        .then((res) => res.json())
        .then((data: BgOption[]) => data.map((bg) => ({ ...bg, type: "video" as const }))),
    ])
      .then(([images, videos]) => {
        setImageBackgrounds(images);
        setVideoBackgrounds(videos);
      })
      .catch(() => {
        setImageBackgrounds([]);
        setVideoBackgrounds([]);
      })
      .finally(() => setLoading(false));
  }, [pickerOpen]);

  /* ---- Shared draggable hook (handles drag, clamp, resize, Esc) ---- */
  const { panelRef, panelStyle, backdropDragged, onDragStart } =
    useDraggableModal({ isOpen: pickerOpen, onClose: closePicker });

  if (!mounted || !pickerOpen) return null;

  const allBgs = activeTab === "image" ? imageBackgrounds : activeTab === "video" ? videoBackgrounds : [];
  const backgrounds = allBgs.filter((bg) => !bg.theme || bg.theme === theme);
  const isColorTab = activeTab === "color";

  return createPortal(
    <div
      className={`fixed inset-0 z-[900] bg-black/20 backdrop-blur-[var(--glass-blur-overlay)] animate-backdrop-fade-in flex items-center justify-center overflow-y-auto p-5 dark:bg-black/40 ${backdropDragged ? "items-start justify-start p-0" : ""}`}
      onClick={closePicker}
      role="dialog"
      aria-modal="true"
      aria-label="Choose background"
    >
      <div
        ref={panelRef}
        className="glass-panel min-w-[min(480px,90vw)] max-w-[90vw] max-h-[calc(100vh-40px)] px-7 pt-7 pb-6 animate-picker-enter select-none cursor-grab active:cursor-grabbing max-[480px]:min-w-0 max-[480px]:w-[calc(100vw-32px)] max-[480px]:px-5 max-[480px]:pt-[22px] max-[480px]:pb-[18px]"
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onDragStart}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-1">
          <span className="text-[16px] font-[650] text-text-primary tracking-[-0.02em]">Choose Background</span>
          <button
            className="w-7 h-7 flex items-center justify-center border-none bg-black/6 rounded-full cursor-pointer text-text-secondary transition-all duration-200 ease-default hover:bg-black/10 hover:text-text-primary dark:bg-white/8 dark:hover:bg-white/14"
            onClick={closePicker}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 mb-5 relative z-1 p-0.5 rounded-[10px] bg-black/[0.04] dark:bg-white/[0.06]"
          role="tablist"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-[7px] rounded-[8px] text-[13px] font-[590] tracking-[-0.01em] cursor-pointer border-none transition-all duration-200 ease-[var(--transition-apple)] ${
                  isActive
                    ? "bg-white/80 text-text-primary shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.04)] dark:bg-white/[0.12] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_0_0_0.5px_rgba(255,255,255,0.06)]"
                    : "bg-transparent text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-3 gap-3 relative z-1 max-[480px]:grid-cols-1 max-[480px]:gap-2.5" onMouseDown={(e) => e.stopPropagation()}>
          {/* ── Image / Video tabs ── */}
          {!isColorTab && loading && <span className="col-span-full text-center py-5 text-text-secondary text-[13px]">Loading...</span>}
          {!isColorTab && !loading && backgrounds.length === 0 && (
            <span className="col-span-full text-center py-8 text-text-tertiary text-[13px]">
              No {activeTab === "video" ? "video" : "image"} backgrounds found
            </span>
          )}
          {!isColorTab && !loading &&
            backgrounds.map((bg) => {
              const isActive = bg.id === currentBgId;
              const isVideo = activeTab === "video";

              return (
                <button
                  key={bg.id}
                  className={`relative aspect-[16/10] rounded-glass-sm overflow-hidden cursor-pointer border-3 border-transparent transition-all duration-250 ease-[var(--transition-apple)] shadow-glass-sm hover:scale-[1.04] hover:shadow-glass active:scale-[0.98] max-[480px]:aspect-[16/8] ${isActive ? "border-accent shadow-[0_0_0_2px_rgba(0,122,255,0.2)] hover:scale-100" : ""}`}
                  onClick={() => {
                    setBg(bg.id, bg.src, bg.type as BgType);
                    closePicker();
                  }}
                  aria-label={`Set background to ${bg.label}`}
                  aria-pressed={isActive}
                >
                  {isVideo ? (
                    <video
                      src={bg.src}
                      muted
                      playsInline
                      loop
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <img
                      src={bg.src}
                      alt={bg.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {/* Label bar */}
                  <span className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 bg-gradient-to-t from-black/45 text-white text-[11px] font-[600] tracking-[-0.01em] [text-shadow:0_1px_2px_rgba(0,0,0,0.3)] flex items-center gap-1.5">
                    {isVideo && (
                      <VideoPlay size={10} color="currentColor" variant="Bold" className="shrink-0 opacity-80" />
                    )}
                    {bg.label}
                  </span>
                  {/* Active checkmark */}
                  {isActive && (
                    <span className="absolute top-2 right-2 w-[22px] h-[22px] bg-accent rounded-full flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.2)] animate-picker-enter">
                      <TickCircle size={14} color="white" variant="Bold" />
                    </span>
                  )}
                </button>
              );
            })}

          {/* ── Color / Pattern tab ── */}
          {isColorTab &&
            COLOR_BACKGROUNDS.filter((p) => !p.theme || p.theme === theme).map((preset) => {
              const isActive = preset.id === currentBgId && currentBgType === "color";
              return (
                <button
                  key={preset.id}
                  className={`relative aspect-[16/10] rounded-glass-sm overflow-hidden cursor-pointer border-3 border-transparent transition-all duration-250 ease-[var(--transition-apple)] shadow-glass-sm hover:scale-[1.04] hover:shadow-glass active:scale-[0.98] max-[480px]:aspect-[16/8] ${isActive ? "border-accent shadow-[0_0_0_2px_rgba(0,122,255,0.2)] hover:scale-100" : ""}`}
                  onClick={() => {
                    setBg(preset.id, preset.id, "color");
                    closePicker();
                  }}
                  aria-label={`Set background to ${preset.label}`}
                  aria-pressed={isActive}
                >
                  {/* CSS pattern preview */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={preset.style}
                  />
                  {/* Label bar */}
                  <span className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 bg-gradient-to-t from-black/30 text-white text-[11px] font-[600] tracking-[-0.01em] [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    {preset.label}
                  </span>
                  {/* Active checkmark */}
                  {isActive && (
                    <span className="absolute top-2 right-2 w-[22px] h-[22px] bg-accent rounded-full flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.2)] animate-picker-enter">
                      <TickCircle size={14} color="white" variant="Bold" />
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>,
    document.body
  );
}
