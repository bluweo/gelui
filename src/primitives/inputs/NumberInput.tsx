import { type CSSProperties } from "react";

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

  return (
    <div
      className={[
        "inline-flex items-center gap-2.5",
        disabled ? "opacity-50" : "",
        className,
      ].join(" ")}
      style={style}
    >
      {/* Minus button */}
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || (min !== undefined && value <= min)}
        className={[
          "flex items-center justify-center w-9 h-9 rounded-full border-none shrink-0",
          "bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)]",
          "text-lg font-medium font-[family-name:var(--font-mono)]",
          "transition-all duration-150",
          disabled ? "cursor-not-allowed" : "cursor-pointer hover:brightness-90",
        ].join(" ")}
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
        className={[
          "w-[50px] text-center text-xl font-bold py-1.5 px-1",
          "font-[family-name:var(--font-mono)] text-[var(--theme-fg)]",
          "border-2 border-transparent rounded-[var(--glass-radius-sm,8px)]",
          "bg-transparent outline-none transition-all duration-150",
          "focus:border-[var(--theme-fg)] focus:bg-[var(--theme-table-bg)]",
          "[font-variant-numeric:tabular-nums]",
        ].join(" ")}
      />

      {/* Plus button */}
      <button
        type="button"
        onClick={increment}
        disabled={disabled || (max !== undefined && value >= max)}
        className={[
          "flex items-center justify-center w-9 h-9 rounded-full border-none shrink-0",
          "bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)]",
          "text-lg font-medium font-[family-name:var(--font-mono)]",
          "transition-all duration-150",
          disabled ? "cursor-not-allowed" : "cursor-pointer hover:brightness-90",
        ].join(" ")}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}
