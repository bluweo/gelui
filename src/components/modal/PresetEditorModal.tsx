import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDraggableModal } from "@/components/hooks/useDraggableModal";

const SIZE_OPTIONS = ["8px","9px","10px","11px","11.5px","12px","13px","14px","15px","16px","17px","18px","20px","22px","24px","28px","30px","36px","42px","48px"];
const WEIGHT_OPTIONS = ["300","350","400","450","500","550","600","650","700","750","800"];
const LH_OPTIONS = ["1","1.1","1.2","1.25","1.3","1.35","1.4","1.5","1.6","1.7","1.8","2"];

interface PresetEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetName: string;
  sample: string;
  fontFamily: string;
  size: string;
  weight: string;
  lh: string;
  onApply: (size: string, weight: string, lh: string) => void;
}

function OptionColumn({
  label,
  options,
  value,
  original,
  onChange,
  isDark,
}: {
  label: string;
  options: string[];
  value: string;
  original: string;
  onChange: (v: string) => void;
  isDark: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const el = listRef.current.querySelector("[data-active]");
      if (el) el.scrollIntoView({ block: "center" });
    }
  }, []);

  return (
    <div className="flex-1 min-w-0 flex flex-col" onMouseDown={(e) => e.stopPropagation()}>
      <span
        className="text-[10px] font-[650] uppercase tracking-[0.06em] mb-2 px-1"
        style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
      >
        {label}
      </span>
      <div
        ref={listRef}
        className="rounded-[var(--glass-radius-sm)] overflow-hidden"
        style={{
          background: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.95)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          maxHeight: "240px",
          overflowY: "auto",
          scrollbarWidth: "thin",
        }}
      >
        {options.map((opt) => {
          const isActive = opt === value;
          const isOriginal = opt === original && opt !== value;
          return (
            <div
              key={opt}
              data-active={isActive || undefined}
              onClick={() => onChange(opt)}
              role="button"
              tabIndex={0}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "9px 14px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                background: isActive ? (isDark ? "#fff" : "#000") : "transparent",
                color: isActive ? (isDark ? "#000" : "#fff") : (isDark ? "#ccc" : "#333"),
                fontWeight: isActive ? 600 : 400,
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`,
                cursor: "pointer",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <span style={{ color: isActive ? (isDark ? "#000" : "#fff") : (isDark ? "#ccc" : "#333") }}>{opt}</span>
              {isOriginal && (
                <span style={{
                  fontSize: "9px", padding: "2px 6px", borderRadius: "999px",
                  background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                  color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
                }}>
                  current
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PresetEditorModal({
  isOpen,
  onClose,
  presetName,
  sample,
  fontFamily,
  size,
  weight,
  lh,
  onApply,
}: PresetEditorModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [tempSize, setTempSize] = useState(size);
  const [tempWeight, setTempWeight] = useState(weight);
  const [tempLh, setTempLh] = useState(lh);

  const { panelRef, panelStyle, backdropDragged, onDragStart } = useDraggableModal({
    isOpen,
    onClose,
  });

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Sync temp values when modal opens or preset changes
  useEffect(() => {
    if (isOpen) {
      setTempSize(size);
      setTempWeight(weight);
      setTempLh(lh);
    }
  }, [isOpen, size, weight, lh]);

  if (!mounted || !isOpen) return null;

  const handleApply = () => {
    onApply(tempSize, tempWeight, tempLh);
    onClose();
  };

  const previewText = sample.length > 80 ? sample.slice(0, 80) + "…" : sample;

  return createPortal(
    <div
      className={`fixed inset-0 z-[900] bg-black/20 backdrop-blur-[var(--glass-blur-overlay)] flex items-center justify-center overflow-y-auto p-5 dark:bg-black/40 ${backdropDragged ? "items-start justify-start p-0" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Edit type preset"
    >
      <div
        ref={panelRef}
        className="glass-panel max-w-[92vw] max-h-[calc(100vh-40px)] px-7 pt-7 pb-6 select-none cursor-grab active:cursor-grabbing max-[480px]:px-5 max-[480px]:pt-[22px] max-[480px]:pb-[18px]"
        style={{ ...panelStyle, width: "min(620px, 92vw)" }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onDragStart}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-1">
          <div>
            <span className="text-[16px] font-[650] text-text-primary tracking-[-0.02em]">{presetName}</span>
            <p className="text-[11px] mt-0.5 text-text-secondary">Edit type preset</p>
          </div>
          <button
            className="w-7 h-7 flex items-center justify-center border-none bg-black/6 rounded-full cursor-pointer text-text-secondary transition-all duration-200 ease-default hover:bg-black/10 hover:text-text-primary dark:bg-white/8 dark:hover:bg-white/14"
            onClick={onClose}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Live Preview */}
        <div
          className="mb-5 p-4 rounded-[var(--glass-radius-sm)] overflow-hidden"
          style={{
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
            minHeight: "70px",
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <p
            className="transition-all duration-200"
            style={{
              fontSize: tempSize,
              fontWeight: Number(tempWeight),
              lineHeight: tempLh,
              fontFamily,
              color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)",
              wordBreak: "break-word",
            }}
          >
            {previewText}
          </p>
          <span
            className="block mt-2 text-[10px] font-mono"
            style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
          >
            {tempSize} · {tempWeight} · {tempLh}
          </span>
        </div>

        {/* 3-column settings */}
        <div className="flex gap-3 mb-5 max-[540px]:flex-col">
          <OptionColumn label="Font Size" options={SIZE_OPTIONS} value={tempSize} original={size} onChange={setTempSize} isDark={isDark} />
          <OptionColumn label="Weight" options={WEIGHT_OPTIONS} value={tempWeight} original={weight} onChange={setTempWeight} isDark={isDark} />
          <OptionColumn label="Line Height" options={LH_OPTIONS} value={tempLh} original={lh} onChange={setTempLh} isDark={isDark} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-[var(--glass-radius-sm)] text-[13px] font-[550] transition-colors duration-150 cursor-pointer"
            style={{
              background: "transparent",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
              color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-[var(--glass-radius-sm)] text-[13px] font-[600] transition-colors duration-150 border-none cursor-pointer"
            style={{
              background: isDark ? "#fff" : "#000",
              color: isDark ? "#000" : "#fff",
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
