import { type CSSProperties, useState, useRef, useCallback } from "react";

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (v: number) => void;
  showValue?: boolean;
  variant?: "flat" | "gel";
  className?: string;
  style?: CSSProperties;
}

export function Slider({
  min = 0,
  max = 100,
  value: controlledValue,
  onChange,
  showValue = false,
  variant = "flat",
  className = "",
  style,
}: SliderProps) {
  const [internal, setInternal] = useState(50);
  const val = controlledValue ?? internal;
  const pct = ((val - min) / (max - min)) * 100;

  const handleChange = (v: number) => {
    setInternal(v);
    onChange?.(v);
  };

  if (variant === "gel") {
    return (
      <GelSlider
        min={min}
        max={max}
        value={val}
        onChange={handleChange}
        showValue={showValue}
        className={className}
        style={style}
      />
    );
  }

  // flat (default)
  return (
    <div className={`prim-slider-flat-track ${className}`} style={style}>
      <div className="prim-slider-flat-rail">
        {/* Track fill */}
        <div
          className="prim-slider-flat-fill"
          style={{ "--prim-slider-pct": pct + "%" } as CSSProperties}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="prim-slider-flat-thumb"
        />
      </div>
      {showValue && <span className="prim-slider-value">{val}</span>}
    </div>
  );
}

/* --- Gel Slider (LiquidGlassSlider-style) --- */

function GelSlider({
  min,
  max,
  value,
  onChange,
  showValue,
  className,
  style,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  showValue: boolean;
  className: string;
  style?: CSSProperties;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;

  const resolveValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );
      let raw = min + ratio * (max - min);
      raw = Math.round(raw);
      raw = Math.max(min, Math.min(max, raw));
      onChange(raw);
    },
    [min, max, onChange],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setIsDragging(true);
      resolveValue(e.clientX);
    },
    [resolveValue],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      resolveValue(e.clientX);
    },
    [isDragging, resolveValue],
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className={`gel-glass ${className}`}
      style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", ...style }}
    >
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          position: "relative",
          flex: 1,
          height: "28px",
          display: "flex",
          alignItems: "center",
          touchAction: "none",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {/* Track rail */}
        <div className="slider-track">
          {/* Track fill */}
          <div
            className="slider-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        {/* Glass thumb */}
        <div
          className={`slider-thumb ${isDragging ? "slider-thumb-dragging" : ""}`}
          data-dragging={isDragging}
          style={{ left: `${pct}%` }}
        />
        {/* Hidden native input for a11y */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Gel slider"
          tabIndex={0}
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            whiteSpace: "nowrap",
          }}
        />
      </div>
      {showValue && <span className="prim-slider-value">{value}</span>}
    </div>
  );
}
