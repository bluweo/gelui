import { type CSSProperties, useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (v: number) => void;
  showValue?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Slider({
  min = 0,
  max = 100,
  value: controlledValue,
  onChange,
  showValue = false,
  className = "",
  style,
}: SliderProps) {
  const dark = useDarkMode();
  const [internal, setInternal] = useState(50);
  const val = controlledValue ?? internal;
  const pct = ((val - min) / (max - min)) * 100;

  const handleChange = (v: number) => {
    setInternal(v);
    onChange?.(v);
  };

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
            background: dark
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.1)",
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
            background: dark
              ? "linear-gradient(90deg, rgba(255,255,255,0.4), #fff)"
              : "linear-gradient(90deg, rgba(0,0,0,0.3), #000)",
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
            color: dark ? "#fff" : "#000",
          }}
        >
          {val}
        </span>
      )}
    </div>
  );
}
