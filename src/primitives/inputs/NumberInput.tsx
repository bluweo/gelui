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

  const borderColor = focused
    ? dark
      ? "#fff"
      : "#000"
    : "transparent";

  const bg = focused
    ? dark
      ? "rgba(30,30,30,1)"
      : "rgba(255,255,255,1)"
    : dark
      ? "rgba(255,255,255,0.08)"
      : "rgba(255,255,255,0.6)";

  const stepBtnStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "100%",
    border: "none",
    background: "transparent",
    color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "18px",
    fontWeight: 500,
    fontFamily: "var(--font-mono)",
    padding: 0,
    transition: "color 150ms ease",
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
  };

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "var(--glass-radius-sm, 10px)",
        border: `2px solid ${borderColor}`,
        background: bg,
        transition: "all 200ms ease",
        overflow: "hidden",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || (min !== undefined && value <= min)}
        style={{
          ...stepBtnStyle,
          borderRight: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        }}
        aria-label="Decrease"
      >
        &minus;
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "60px",
          textAlign: "center",
          border: "none",
          background: "transparent",
          outline: "none",
          fontSize: "14px",
          fontFamily: "var(--font-mono)",
          fontWeight: 500,
          color: dark ? "#fff" : "#000",
          padding: "10px 4px",
          fontVariantNumeric: "tabular-nums",
        }}
      />
      <button
        type="button"
        onClick={increment}
        disabled={disabled || (max !== undefined && value >= max)}
        style={{
          ...stepBtnStyle,
          borderLeft: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        }}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}
