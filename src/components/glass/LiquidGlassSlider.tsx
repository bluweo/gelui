import { useRef, useCallback, useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface LiquidGlassSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  ariaLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LiquidGlassSlider({
  min,
  max,
  step,
  value,
  onChange,
  ariaLabel,
}: LiquidGlassSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  /* ---- Normalised 0..1 position ---- */
  const percent = Math.max(0, Math.min(1, (value - min) / (max - min)));

  /* ---- Resolve value from pointer position ---- */
  const resolveValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      let raw = min + ratio * (max - min);
      /* Snap to step */
      raw = Math.round(raw / step) * step;
      raw = Math.max(min, Math.min(max, raw));
      /* Avoid floating-point noise */
      const decimals = (step.toString().split(".")[1] || "").length;
      onChange(parseFloat(raw.toFixed(decimals)));
    },
    [min, max, step, onChange]
  );

  /* ---- Pointer events ---- */
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setIsDragging(true);
      resolveValue(e.clientX);
    },
    [resolveValue]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      resolveValue(e.clientX);
    },
    [isDragging, resolveValue]
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* ---- Keyboard support via hidden native input ---- */
  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  return (
    <div
      className="relative h-7 flex items-center touch-none cursor-pointer select-none"
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Track rail */}
      <div className="slider-track">
        <div
          className="slider-fill"
          style={{ width: `${percent * 100}%` }}
        />
      </div>

      {/* Liquid Glass Thumb */}
      <div
        className={`slider-thumb ${isDragging ? "slider-thumb-dragging" : ""}`}
        style={{ left: `${percent * 100}%` }}
        role="presentation"
      />

      {/* Hidden native input for accessibility */}
      <input
        type="range"
        className="absolute w-px h-px overflow-hidden [clip:rect(0_0_0_0)] [clip-path:inset(50%)] whitespace-nowrap"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onInputChange}
        aria-label={ariaLabel}
        tabIndex={0}
      />
    </div>
  );
}
