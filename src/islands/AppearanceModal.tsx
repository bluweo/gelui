import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  useAppearance,
  type RadiusPreset,
  type ShadowPreset,
} from "@/context/AppearanceContext";
import { LiquidGlassSlider } from "@/islands/LiquidGlassSlider";
import { useDraggableModal } from "@/hooks/useDraggableModal";

/* ------------------------------------------------------------------ */
/*  Preset options                                                     */
/* ------------------------------------------------------------------ */

const RADIUS_OPTIONS: { value: RadiusPreset; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "medium",  label: "Medium" },
  { value: "large",   label: "Large" },
];

const SHADOW_OPTIONS: { value: ShadowPreset; label: string }[] = [
  { value: "flat",     label: "Flat" },
  { value: "soft",     label: "Soft" },
  { value: "elevated", label: "Elevated" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AppearanceModal() {
  const {
    modalOpen, closeModal,
    transparency, setTransparency,
    radiusPreset, setRadiusPreset,
    blurIntensity, setBlurIntensity,
    shadowPreset, setShadowPreset,
    resetToDefaults,
  } = useAppearance();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  /* ---- Shared draggable hook (handles drag, clamp, resize, Esc) ---- */
  const { panelRef, panelStyle, backdropDragged, onDragStart } =
    useDraggableModal({ isOpen: modalOpen, onClose: closeModal });

  if (!mounted || !modalOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[900] bg-black/20 backdrop-blur-[var(--glass-blur-overlay)] animate-backdrop-fade-in flex items-center justify-center overflow-y-auto p-5 dark:bg-black/40 ${backdropDragged ? "items-start justify-start p-0" : ""}`}
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label="Appearance settings"
    >
      <div
        ref={panelRef}
        className="glass-panel w-[360px] max-w-[90vw] max-h-[calc(100vh-40px)] px-[26px] pt-6 pb-[22px] animate-panel-enter select-none cursor-grab active:cursor-grabbing max-[480px]:w-[calc(100vw-32px)] max-[480px]:px-5 max-[480px]:pt-5 max-[480px]:pb-[18px]"
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onDragStart}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-[22px] relative z-1">
          <span className="text-[16px] font-[650] text-text-primary tracking-[-0.02em]">Appearance</span>
          <div className="flex items-center gap-2">
            <button
              className="py-1 px-2.5 border-none bg-transparent rounded-[6px] font-inherit text-[12px] font-[550] text-text-tertiary cursor-pointer transition-all duration-200 ease-default tracking-[-0.01em] hover:text-text-primary hover:bg-black/6 dark:hover:bg-white/8"
              onClick={resetToDefaults}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Reset to defaults"
            >
              Reset
            </button>
            <button
              className="w-7 h-7 flex items-center justify-center border-none bg-black/6 rounded-full cursor-pointer text-text-secondary transition-all duration-200 ease-default hover:bg-black/10 hover:text-text-primary dark:bg-white/8 dark:hover:bg-white/14"
              onClick={closeModal}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ---- Transparency ---- */}
        <div className="mb-5 relative z-1 last:mb-0" onMouseDown={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11.5px] font-[600] uppercase tracking-[0.06em] text-text-secondary">Transparency</span>
            <span className="text-[11.5px] font-[600] text-text-tertiary tabular-nums">{Math.round(transparency * 100)}%</span>
          </div>
          <LiquidGlassSlider
            min={0.2}
            max={1.0}
            step={0.01}
            value={transparency}
            onChange={setTransparency}
            ariaLabel="Transparency"
          />
        </div>

        <div className="h-px mx-[-26px] mb-5 bg-[rgba(30,30,35,0.06)] dark:bg-white/6 max-[480px]:mx-[-20px] max-[480px]:mb-[18px]" />

        {/* ---- Border Radius ---- */}
        <div className="mb-5 relative z-1 last:mb-0" onMouseDown={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11.5px] font-[600] uppercase tracking-[0.06em] text-text-secondary">Border Radius</span>
          </div>
          <div className="flex gap-1 p-[3px] bg-black/6 rounded-glass-sm dark:bg-white/6">
            {RADIUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`glass-preset-btn ${radiusPreset === opt.value ? "glass-preset-active" : ""}`}
                onClick={() => setRadiusPreset(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px mx-[-26px] mb-5 bg-[rgba(30,30,35,0.06)] dark:bg-white/6 max-[480px]:mx-[-20px] max-[480px]:mb-[18px]" />

        {/* ---- Blur Intensity ---- */}
        <div className="mb-5 relative z-1 last:mb-0" onMouseDown={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11.5px] font-[600] uppercase tracking-[0.06em] text-text-secondary">Blur Intensity</span>
            <span className="text-[11.5px] font-[600] text-text-tertiary tabular-nums">{blurIntensity}px</span>
          </div>
          <LiquidGlassSlider
            min={8}
            max={48}
            step={1}
            value={blurIntensity}
            onChange={setBlurIntensity}
            ariaLabel="Blur intensity"
          />
        </div>

        <div className="h-px mx-[-26px] mb-5 bg-[rgba(30,30,35,0.06)] dark:bg-white/6 max-[480px]:mx-[-20px] max-[480px]:mb-[18px]" />

        {/* ---- Shadow Depth ---- */}
        <div className="mb-5 relative z-1 last:mb-0" onMouseDown={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11.5px] font-[600] uppercase tracking-[0.06em] text-text-secondary">Shadow Depth</span>
          </div>
          <div className="flex gap-1 p-[3px] bg-black/6 rounded-glass-sm dark:bg-white/6">
            {SHADOW_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`glass-preset-btn ${shadowPreset === opt.value ? "glass-preset-active" : ""}`}
                onClick={() => setShadowPreset(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
