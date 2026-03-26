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
    return <GelSlider min={min} max={max} value={val} onChange={handleChange} showValue={showValue} className={className} style={style} />;
  }

  // flat (default)
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        ...style,
      }}
    >
      <div style={{ position: "relative", flex: 1, height: "20px", display: "flex", alignItems: "center" }}>
        {/* Track background */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "4px",
            borderRadius: "2px",
            background: "var(--theme-divider)",
          }}
        />
        {/* Track fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${pct}%`,
            height: "4px",
            borderRadius: "2px",
            background: "var(--theme-fg)",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => handleChange(Number(e.target.value))}
          style={{
            width: "100%",
            height: "20px",
            appearance: "none",
            WebkitAppearance: "none",
            background: "transparent",
            cursor: "pointer",
            position: "relative",
            zIndex: 1,
            margin: 0,
          }}
        />
      </div>
      {showValue && (
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            minWidth: "36px",
            textAlign: "right",
            color: "var(--theme-fg)",
          }}
        >
          {val}
        </span>
      )}
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
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
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
        {/* Track rail — thicker for gel */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "6px",
            borderRadius: "3px",
            background: "var(--theme-divider)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
          }}
        />
        {/* Track fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${pct}%`,
            height: "6px",
            borderRadius: "3px",
            background: "var(--theme-fg-muted)",
          }}
        />
        {/* Glass thumb */}
        <div
          style={{
            position: "absolute",
            left: `${pct}%`,
            top: "50%",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            transition: isDragging ? "none" : "box-shadow 200ms",
            background:
              "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(240,240,244,0.85) 40%, rgba(220,220,228,0.75) 100%)",
            border: "1.5px solid rgba(255,255,255,0.9)",
            boxShadow: isDragging
              ? `0 4px 12px rgba(0,0,0,0.2),
                 0 2px 4px rgba(0,0,0,0.12),
                 inset 0 2px 3px rgba(255,255,255,1),
                 inset 0 -2px 4px rgba(0,0,0,0.06),
                 inset 2px 0 3px rgba(255,255,255,0.5),
                 inset -2px 0 3px rgba(0,0,0,0.04)`
              : `0 2px 8px rgba(0,0,0,0.15),
                 0 1px 3px rgba(0,0,0,0.1),
                 inset 0 2px 3px rgba(255,255,255,1),
                 inset 0 -2px 4px rgba(0,0,0,0.06),
                 inset 2px 0 3px rgba(255,255,255,0.5),
                 inset -2px 0 3px rgba(0,0,0,0.04)`,
          }}
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
      {showValue && (
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            minWidth: "36px",
            textAlign: "right",
            color: "var(--theme-fg)",
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}
