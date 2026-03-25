import { type CSSProperties, useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface NumberInputProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className = "",
  style,
}: NumberInputProps) {
  const dark = useDarkMode();
  const [focused, setFocused] = useState(false);

  const clamp = (v: number) => {
    let n = v;
    if (min !== undefined && n < min) n = min;
    if (max !== undefined && n > max) n = max;
    return n;
  };

  const decrement = () => {
    if (!disabled) onChange(clamp(value - step));
  };

  const increment = () => {
    if (!disabled) onChange(clamp(value + step));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) {
      onChange(clamp(parsed));
    }
  };

  const btnBg = dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)";
  const btnHoverBg = dark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.10)";
  const btnColor = dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)";

  const [hoverMinus, setHoverMinus] = useState(false);
  const [hoverPlus, setHoverPlus] = useState(false);

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {/* Minus button — circle */}
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || (min !== undefined && value <= min)}
        onMouseEnter={() => setHoverMinus(true)}
        onMouseLeave={() => setHoverMinus(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "none",
          background: hoverMinus && !disabled ? btnHoverBg : btnBg,
          color: btnColor,
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: 18,
          fontWeight: 500,
          fontFamily: "var(--font-mono)",
          transition: "all 0.15s ease",
          flexShrink: 0,
        }}
        aria-label="Decrease"
      >
        −
      </button>

      {/* Number display */}
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: 50,
          textAlign: "center",
          border: focused ? `2px solid ${dark ? "#fff" : "#000"}` : `2px solid transparent`,
          borderRadius: "var(--glass-radius-sm, 8px)",
          background: focused ? (dark ? "rgba(30,30,30,1)" : "#fff") : "transparent",
          outline: "none",
          fontSize: 20,
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          color: dark ? "#fff" : "#000",
          padding: "6px 4px",
          fontVariantNumeric: "tabular-nums",
          transition: "all 0.15s ease",
        }}
      />

      {/* Plus button — circle */}
      <button
        type="button"
        onClick={increment}
        disabled={disabled || (max !== undefined && value >= max)}
        onMouseEnter={() => setHoverPlus(true)}
        onMouseLeave={() => setHoverPlus(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "none",
          background: hoverPlus && !disabled ? btnHoverBg : btnBg,
          color: btnColor,
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: 18,
          fontWeight: 500,
          fontFamily: "var(--font-mono)",
          transition: "all 0.15s ease",
          flexShrink: 0,
        }}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}
