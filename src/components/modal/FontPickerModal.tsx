import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useAppearance, SAME_AS_BODY, type FontRole } from "@/components/context/AppearanceContext";
import { useDraggableModal } from "@/components/hooks/useDraggableModal";

/* ─── Custom Tooltip ─── */

function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
    timeoutRef.current = setTimeout(() => setShow(true), 400);
  };
  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    setShow(false);
  };

  return (
    <div className="relative inline-flex" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
      {show && pos && createPortal(
        <>
          <div
            className="fixed z-[9999] pointer-events-none flex flex-col items-center"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -100%)",
              animation: "gelui-tooltip 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              className="px-3 py-2 rounded-[10px] text-[11px] font-[500] leading-[1.4] max-w-[220px] text-center whitespace-normal"
              style={{
                background: "rgba(0, 0, 0, 0.88)",
                color: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.08) inset",
              }}
            >
              {text}
            </div>
            <div
              style={{
                width: 0, height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid rgba(0, 0, 0, 0.88)",
              }}
            />
          </div>
          <style>{`@keyframes gelui-tooltip { from { opacity: 0; transform: translate(-50%, calc(-100% + 4px)) scale(0.95); } to { opacity: 1; transform: translate(-50%, -100%) scale(1); } }`}</style>
        </>,
        document.body
      )}
    </div>
  );
}

/* ─── Font Data ─── */

interface FontEntry {
  name: string;
  weights: string;
  style: "sans-serif" | "serif" | "monospace";
}

interface FontCategory {
  name: string;
  fonts: FontEntry[];
}

const SANS_CATEGORIES: FontCategory[] = [
  {
    name: "Modern",
    fonts: [
      { name: "Inter", weights: "400;500;600;700", style: "sans-serif" },
      { name: "Montserrat", weights: "400;500;600;700", style: "sans-serif" },
      { name: "Poppins", weights: "400;500;600;700", style: "sans-serif" },
      { name: "Roboto", weights: "400;500;700", style: "sans-serif" },
      { name: "Lato", weights: "400;700", style: "sans-serif" },
    ],
  },
  {
    name: "Luxury",
    fonts: [
      { name: "Playfair Display", weights: "400;500;600;700", style: "serif" },
      { name: "Cormorant Garamond", weights: "400;500;600;700", style: "serif" },
      { name: "Cinzel", weights: "400;500;600;700", style: "serif" },
      { name: "Prata", weights: "400", style: "serif" },
      { name: "Marcellus", weights: "400", style: "serif" },
    ],
  },
  {
    name: "Classic",
    fonts: [
      { name: "Merriweather", weights: "400;700", style: "serif" },
      { name: "Lora", weights: "400;500;600;700", style: "serif" },
      { name: "EB Garamond", weights: "400;500;600;700", style: "serif" },
      { name: "Crimson Text", weights: "400;600;700", style: "serif" },
      { name: "PT Serif", weights: "400;700", style: "serif" },
    ],
  },
  {
    name: "Multi-Language",
    fonts: [
      { name: "Noto Sans", weights: "400;500;600;700", style: "sans-serif" },
      { name: "Noto Serif", weights: "400;500;600;700", style: "serif" },
      { name: "Open Sans", weights: "400;500;600;700", style: "sans-serif" },
      { name: "Google Sans", weights: "400;500;600;700", style: "sans-serif" },
    ],
  },
];

const MONO_FONTS: FontEntry[] = [
  { name: "System Default", weights: "400;700", style: "monospace" },
  { name: "JetBrains Mono", weights: "400;500;600;700", style: "monospace" },
  { name: "Fira Code", weights: "400;500;600;700", style: "monospace" },
  { name: "Source Code Pro", weights: "400;500;600;700", style: "monospace" },
  { name: "IBM Plex Mono", weights: "400;500;600;700", style: "monospace" },
  { name: "Roboto Mono", weights: "400;500;600;700", style: "monospace" },
];

const DEFAULT_FONT = "Google Sans";

/* ─── Role config ─── */

const ROLE_INFO: Record<FontRole, { label: string; description: string }> = {
  heading: { label: "Heading", description: "H1–H6, hero text, banners, titles" },
  body: { label: "Body", description: "Paragraphs, descriptions, content" },
  ui: { label: "UI", description: "Buttons, nav, labels, badges, forms" },
  mono: { label: "Mono", description: "Code, tokens, technical data" },
  data: { label: "Data", description: "Tables, numbers, metrics, dashboards" },
  accent: { label: "Accent", description: "Quotes, callouts, highlights, decoration" },
};

/* ─── Font loader ─── */

const loadedFonts = new Set<string>();

function loadGoogleFont(fontName: string, weights: string = "400;500;600;700") {
  if (loadedFonts.has(fontName) || fontName === DEFAULT_FONT || fontName === "System Default" || fontName === SAME_AS_BODY) return;
  const linkId = `google-font-${fontName.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(linkId)) { loadedFonts.add(fontName); return; }
  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@${weights}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(fontName);
}

/* ─── Component ─── */

export function FontPickerModal() {
  const { fonts, setFontRole, fontPickerOpen, closeFontPicker, activeFontRole, openFontPicker, theme, fontPreviewText, setFontPreviewText } = useAppearance();
  const [mounted, setMounted] = useState(false);
  const previewText = fontPreviewText;
  const setPreviewText = setFontPreviewText;
  const [activeCategory, setActiveCategory] = useState("Modern");
  const [view, setView] = useState<"roles" | "browse">("roles");
  // Remember previous font per role before linking, so unlink can restore
  const [prevFonts, setPrevFonts] = useState<Record<string, string>>({});
  const fontListRef = useRef<HTMLDivElement>(null);

  const { panelRef, panelStyle, backdropDragged, onDragStart } =
    useDraggableModal({ isOpen: fontPickerOpen, onClose: closeFontPicker });

  useEffect(() => setMounted(true), []);

  // Reset to roles view when modal opens (unless overridden by browse event)
  useEffect(() => {
    if (fontPickerOpen) setView("roles");
  }, [fontPickerOpen]);

  // Listen for direct-to-browse event from font card settings buttons
  useEffect(() => {
    const handler = () => setView("browse");
    window.addEventListener("gelui:font-picker-browse", handler);
    return () => window.removeEventListener("gelui:font-picker-browse", handler);
  }, []);

  // When entering browse view, find the category of the current font and auto-select it
  useEffect(() => {
    if (view !== "browse" || activeFontRole === "mono") return;
    const currentVal = fonts[activeFontRole];
    if (!currentVal || currentVal === SAME_AS_BODY) return;
    // Find which category contains the current font
    for (const cat of SANS_CATEGORIES) {
      if (cat.fonts.some((f) => f.name === currentVal)) {
        setActiveCategory(cat.name);
        break;
      }
    }
  }, [view, activeFontRole, fonts]);

  // Scroll to the selected font card when browse view opens
  useEffect(() => {
    if (view !== "browse") return;
    const timer = setTimeout(() => {
      const container = fontListRef.current;
      if (!container) return;
      const activeEl = container.querySelector("[data-font-active='true']");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }, 150); // small delay for fonts to render
    return () => clearTimeout(timer);
  }, [view, activeCategory]);

  // Pre-load fonts for active category
  useEffect(() => {
    if (!fontPickerOpen || view !== "browse") return;
    if (activeFontRole === "mono") {
      MONO_FONTS.forEach((f) => loadGoogleFont(f.name, f.weights));
    } else {
      const cat = SANS_CATEGORIES.find((c) => c.name === activeCategory);
      cat?.fonts.forEach((f) => loadGoogleFont(f.name, f.weights));
    }
  }, [fontPickerOpen, activeCategory, view, activeFontRole]);

  const handleSelectFont = useCallback(
    (fontName: string) => {
      setFontRole(activeFontRole, fontName);
      setView("roles");
    },
    [activeFontRole, setFontRole]
  );

  const handleToggleLink = useCallback((role: FontRole) => {
    const current = fonts[role];
    if (current === SAME_AS_BODY) {
      // Unlinking — restore previous font, or fallback to current body font
      const restored = prevFonts[role] || fonts.body;
      setFontRole(role, restored);
    } else {
      // Linking — save current font before overwriting
      setPrevFonts((prev) => ({ ...prev, [role]: current as string }));
      setFontRole(role, SAME_AS_BODY);
    }
  }, [fonts, prevFonts, setFontRole]);

  const handleResetAll = useCallback(() => {
    setPrevFonts({});
    setFontRole("heading", DEFAULT_FONT);
    setFontRole("body", DEFAULT_FONT);
    setFontRole("ui", SAME_AS_BODY);
    setFontRole("mono", "System Default");
    setFontRole("data", null);
    setFontRole("accent", null);
  }, [setFontRole]);

  const getCurrentFont = (role: FontRole): string => {
    const val = fonts[role];
    if (val === null) return "Not set";
    if (val === SAME_AS_BODY) return `Same as Body (${fonts.body})`;
    return val;
  };

  if (!mounted || !fontPickerOpen) return null;

  const isMono = activeFontRole === "mono";
  const activeFonts = isMono
    ? MONO_FONTS
    : SANS_CATEGORIES.find((c) => c.name === activeCategory)?.fonts ?? [];
  const currentValue = fonts[activeFontRole];

  return createPortal(
    <div
      className={`fixed inset-0 z-[900] flex ${backdropDragged ? "items-start justify-start p-0" : "items-center justify-center"}`}
      onClick={(e) => { if (e.target === e.currentTarget) closeFontPicker(); }}
      style={{
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(var(--glass-blur-overlay, 12px))",
        WebkitBackdropFilter: "blur(var(--glass-blur-overlay, 12px))",
        animation: "backdrop-fade-in 0.2s ease-out",
      }}
    >
      <div
        ref={panelRef as React.RefObject<HTMLDivElement>}
        className="glass-panel glass-specular rounded-[var(--glass-radius-lg)] overflow-hidden select-none"
        style={{ width: "min(520px, 92vw)", maxHeight: "min(700px, 85vh)", ...panelStyle, animation: "panel-enter 0.25s ease-out" }}
        onMouseDown={onDragStart}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            {view === "browse" && (
              <button
                onClick={() => setView("roles")}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors duration-150 mr-1"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            )}
            <span className="text-[15px] font-[600]">
              {view === "roles" ? "Font Families" : `Choose ${ROLE_INFO[activeFontRole].label} Font`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {view === "roles" && (
              <button
                onClick={handleResetAll}
                className="text-[11px] font-[550] px-2.5 py-1 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.14] transition-colors duration-150"
                onMouseDown={(e) => e.stopPropagation()}
              >
                Reset All
              </button>
            )}
            <button
              onClick={closeFontPicker}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors duration-150"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        <div className="h-px bg-black/[0.06] dark:bg-white/[0.08]" />

        {/* ═══ ROLES VIEW ═══ */}
        {view === "roles" && (
          <div
            className="px-5 py-4 flex flex-col gap-3 overflow-y-auto"
            style={{ maxHeight: "min(560px, 70vh)" }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Standard section label */}
            <span className="text-[10px] font-[650] uppercase tracking-[0.1em] text-black/40 dark:text-white/35">Standard</span>

            {/* Heading */}
            <RoleCard
              role="heading"
              label={ROLE_INFO.heading.label}
              description={ROLE_INFO.heading.description}
              currentFont={getCurrentFont("heading")}
              fontFamily={fonts.heading === SAME_AS_BODY ? fonts.body : fonts.heading}
              isSameAsBody={fonts.heading === SAME_AS_BODY}
              onBrowse={() => { openFontPicker("heading"); setView("browse"); }}
              onToggleSame={() => handleToggleLink("heading")}
            />

            {/* Body */}
            <RoleCard
              role="body"
              label={ROLE_INFO.body.label}
              description={ROLE_INFO.body.description}
              currentFont={getCurrentFont("body")}
              fontFamily={fonts.body}
              onBrowse={() => { openFontPicker("body"); setView("browse"); }}
            />

            {/* UI */}
            <RoleCard
              role="ui"
              label={ROLE_INFO.ui.label}
              description={ROLE_INFO.ui.description}
              currentFont={getCurrentFont("ui")}
              fontFamily={fonts.ui === SAME_AS_BODY ? fonts.body : fonts.ui}
              isSameAsBody={fonts.ui === SAME_AS_BODY}
              onBrowse={() => { openFontPicker("ui"); setView("browse"); }}
              onToggleSame={() => handleToggleLink("ui")}
            />

            {/* Mono */}
            <RoleCard
              role="mono"
              label={ROLE_INFO.mono.label}
              description={ROLE_INFO.mono.description}
              currentFont={getCurrentFont("mono")}
              fontFamily={fonts.mono === "System Default" ? "SF Mono, ui-monospace, monospace" : fonts.mono}
              onBrowse={() => { openFontPicker("mono"); setView("browse"); }}
            />

            {/* Optional section */}
            {(fonts.data !== null || fonts.accent !== null) && (
              <span className="text-[10px] font-[650] uppercase tracking-[0.1em] text-black/40 dark:text-white/35 mt-2">Optional</span>
            )}

            {/* Data (optional) */}
            {fonts.data !== null && (
              <RoleCard
                role="data"
                label={ROLE_INFO.data.label}
                description={ROLE_INFO.data.description}
                currentFont={getCurrentFont("data")}
                fontFamily={fonts.data}
                onBrowse={() => { openFontPicker("data"); setView("browse"); }}
                onRemove={() => setFontRole("data", null)}
              />
            )}

            {/* Accent (optional) */}
            {fonts.accent !== null && (
              <RoleCard
                role="accent"
                label={ROLE_INFO.accent.label}
                description={ROLE_INFO.accent.description}
                currentFont={getCurrentFont("accent")}
                fontFamily={fonts.accent}
                onBrowse={() => { openFontPicker("accent"); setView("browse"); }}
                onRemove={() => setFontRole("accent", null)}
              />
            )}

            {/* Add more buttons */}
            {(fonts.data === null || fonts.accent === null) && (
              <div className="flex gap-2 mt-1">
                {fonts.data === null && (
                  <button
                    onClick={() => setFontRole("data", fonts.body)}
                    className="flex-1 py-3 px-4 rounded-[var(--glass-radius-sm)] border border-dashed border-black/[0.12] dark:border-white/[0.12] text-[12px] font-[550] text-black/40 dark:text-white/35 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] hover:text-black/60 dark:hover:text-white/50 transition-all duration-150"
                  >
                    + Add Data Font
                  </button>
                )}
                {fonts.accent === null && (
                  <button
                    onClick={() => setFontRole("accent", fonts.body)}
                    className="flex-1 py-3 px-4 rounded-[var(--glass-radius-sm)] border border-dashed border-black/[0.12] dark:border-white/[0.12] text-[12px] font-[550] text-black/40 dark:text-white/35 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] hover:text-black/60 dark:hover:text-white/50 transition-all duration-150"
                  >
                    + Add Accent Font
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══ BROWSE VIEW ═══ */}
        {view === "browse" && (
          <>
            {/* Preview text */}
            <div className="px-5 py-3">
              <input
                type="text"
                value={previewText}
                onChange={(e) => {
                  setPreviewText(e.target.value);
                  window.dispatchEvent(new CustomEvent("gelui:font-preview-text", { detail: { text: e.target.value } }));
                }}
                placeholder="Type preview text..."
                className="w-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] rounded-[var(--glass-radius-sm)] px-3 py-2 text-[13px] outline-none focus:border-black/[0.15] dark:focus:border-white/[0.2] transition-colors duration-150"
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>

            {/* Category tabs (sans/serif roles only) */}
            {!isMono && (
              <div className="px-5 pb-2 flex gap-1.5 flex-wrap">
                {SANS_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`text-[11px] font-[550] px-3 py-1.5 rounded-full transition-all duration-150 ${
                      activeCategory === cat.name
                        ? "bg-black/[0.1] dark:bg-white/[0.15] text-black dark:text-white"
                        : "bg-black/[0.03] dark:bg-white/[0.05] text-black/50 dark:text-white/40 hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
                    }`}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            <div className="h-px bg-black/[0.06] dark:bg-white/[0.08]" />

            {/* Font list */}
            <div
              ref={fontListRef}
              className="overflow-y-auto px-5 py-3 flex flex-col gap-2"
              style={{ maxHeight: "min(400px, 50vh)" }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* "Same as Body" option for heading/ui roles */}
              {(activeFontRole === "heading" || activeFontRole === "ui") && (
                <FontCard
                  name="Same as Body"
                  subtitle={fonts.body}
                  fontFamily={`'${fonts.body}', sans-serif`}
                  previewText={previewText}
                  isActive={currentValue === SAME_AS_BODY}
                  onClick={() => handleSelectFont(SAME_AS_BODY)}
                  tag="Linked"
                />
              )}

              {/* Default font option */}
              {(activeFontRole === "body" || activeFontRole === "data" || activeFontRole === "accent") && (
                <FontCard
                  name={DEFAULT_FONT}
                  fontFamily={`'${DEFAULT_FONT}', sans-serif`}
                  previewText={previewText}
                  isActive={currentValue === DEFAULT_FONT}
                  onClick={() => handleSelectFont(DEFAULT_FONT)}
                  tag="Default"
                />
              )}

              {/* Font options (filter out default to avoid duplicate) */}
              {activeFonts.filter((font) => font.name !== DEFAULT_FONT).map((font) => (
                <FontCard
                  key={font.name}
                  name={font.name}
                  fontFamily={`'${font.name}', ${font.style}`}
                  previewText={previewText}
                  isActive={currentValue === font.name}
                  onClick={() => handleSelectFont(font.name)}
                  onHover={() => loadGoogleFont(font.name, font.weights)}
                  tag={font.style}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

/* ─── Sub-components ─── */

const ROLE_CSS_VAR: Record<FontRole, string> = {
  heading: "--font-heading",
  body: "--font-body",
  ui: "--font-ui",
  mono: "--font-mono",
  data: "--font-data",
  accent: "--font-accent",
};

const ROLE_WEIGHTS: Record<FontRole, number[]> = {
  heading: [400, 500, 600, 700],
  body: [400, 500, 550, 600, 650, 700, 750],
  ui: [400, 500, 600, 700],
  mono: [400, 600],
  data: [400, 500, 600, 700],
  accent: [400, 500, 600, 700],
};

function RoleCard({
  role,
  label,
  description,
  currentFont,
  fontFamily,
  isSameAsBody,
  onBrowse,
  onToggleSame,
  onRemove,
}: {
  role: FontRole;
  label: string;
  description: string;
  currentFont: string;
  fontFamily: string;
  isSameAsBody?: boolean;
  onBrowse: () => void;
  onToggleSame?: () => void;
  onRemove?: () => void;
}) {
  const resolvedFamily = fontFamily.includes("System")
    ? "SF Mono, ui-monospace, monospace"
    : `'${fontFamily}', sans-serif`;
  const weights = ROLE_WEIGHTS[role];
  const sampleText = role === "mono"
    ? 'const token = "design-system";'
    : "The quick brown fox jumps over the lazy dog";

  return (
    <div className="p-5 rounded-[var(--glass-radius-sm)] bg-white/90 dark:bg-black/60 border border-black/[0.06] dark:border-white/[0.08]">
      {/* Top: role tag + CSS variable + action buttons */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-[650] uppercase tracking-[0.04em] text-white dark:text-white px-2 py-0.5 rounded-full bg-black/80 dark:bg-white/20">{label}</span>
          <span className="text-[12px] font-[650] font-mono text-black/50 dark:text-white/40">{ROLE_CSS_VAR[role]}</span>
          {/* Status badge only shown when there's no toggle button */}
          {isSameAsBody && !onToggleSame && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-blue-500/[0.08] text-blue-600 dark:text-blue-400">Linked to Body</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {onToggleSame && (
            <Tooltip text={isSameAsBody
              ? "Unlink from Body — use an independent font for this role"
              : "Link to Body — automatically sync with the Body font"
            }>
              <button
                onClick={onToggleSame}
                className={`text-[10px] font-[550] px-2 py-1 rounded-full transition-colors duration-150 ${
                  isSameAsBody
                    ? "bg-blue-500/[0.1] text-blue-600 dark:text-blue-400 hover:bg-blue-500/[0.15]"
                    : "bg-black/[0.04] dark:bg-white/[0.06] text-black/50 dark:text-white/40 hover:bg-black/[0.08]"
                }`}
              >
                {isSameAsBody ? "Unlink from Body" : "Link to Body"}
              </button>
            </Tooltip>
          )}
          {onRemove && (
            <Tooltip text="Remove this optional font role from the system">
              <button
                onClick={onRemove}
                className="text-[10px] font-[550] px-2 py-1 rounded-full bg-red-500/[0.06] text-red-600 dark:text-red-400 hover:bg-red-500/[0.12] transition-colors duration-150"
              >
                Remove
              </button>
            </Tooltip>
          )}
          <Tooltip text="Browse and select a different font from the library">
            <button
              onClick={onBrowse}
              className="text-[10px] font-[550] px-2.5 py-1 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.14] transition-colors duration-150"
            >
              Change
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Description + Font stack */}
      <p className="text-[11px] text-black/40 dark:text-white/35 mb-0.5">{description}</p>
      <p className="text-[11px] font-mono text-black/30 dark:text-white/25 mb-3">{currentFont}</p>

      {/* Sample text previews */}
      <div className="flex flex-col gap-1.5 mb-3">
        <p
          data-font-preview
          className="text-[17px] leading-snug text-black/80 dark:text-white/75 truncate"
          style={{ "--font-preview": resolvedFamily, fontWeight: 400 } as React.CSSProperties}
        >
          {sampleText}
        </p>
        <p
          data-font-preview
          className="text-[17px] leading-snug text-black/80 dark:text-white/75 truncate"
          style={{ "--font-preview": resolvedFamily, fontWeight: role === "mono" ? 600 : 700 } as React.CSSProperties}
        >
          {sampleText}
        </p>
      </div>

      {/* Weight pills */}
      <div className="flex gap-2 flex-wrap">
        {weights.map((w) => (
          <span
            key={w}
            className="text-[11px] font-mono text-black/60 dark:text-white/50 px-2 py-0.5 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04]"
            data-font-preview
            style={{ "--font-preview": resolvedFamily, fontWeight: w } as React.CSSProperties}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

function FontCard({
  name,
  subtitle,
  fontFamily,
  previewText,
  isActive,
  onClick,
  onHover,
  tag,
}: {
  name: string;
  subtitle?: string;
  fontFamily: string;
  previewText: string;
  isActive: boolean;
  onClick: () => void;
  onHover?: () => void;
  tag?: string;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      data-font-active={isActive ? "true" : undefined}
      className={`w-full text-left p-4 rounded-[var(--glass-radius-sm)] transition-all duration-150 ${
        isActive
          ? "border-2 border-black dark:border-white bg-white dark:bg-[#1a1a2a]"
          : "border border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-[#1a1a2a]"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-[600]">{name}</span>
          {subtitle && <span className="text-[10px] text-black/40 dark:text-white/35">{subtitle}</span>}
        </div>
        {tag && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-black/40 dark:text-white/35">
            {tag}
          </span>
        )}
      </div>
      <p data-font-preview className="text-[16px] leading-snug text-black/70 dark:text-white/65 truncate" style={{ "--font-preview": fontFamily } as React.CSSProperties}>
        {previewText}
      </p>
    </button>
  );
}
