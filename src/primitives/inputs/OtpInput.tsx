import { useState, useRef, useCallback, type CSSProperties } from "react";

interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

const sizeClasses = {
  sm: "w-9 h-10 text-base",
  md: "w-11 h-[50px] text-xl",
  lg: "w-[52px] h-[58px] text-2xl",
} as const;

const sizeGaps = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
} as const;

export function OtpInput({
  length = 6,
  value: controlledValue,
  onChange,
  disabled = false,
  error = false,
  success = false,
  size = "md",
  className = "",
  style,
}: OtpInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const value = controlledValue ?? internalValue;
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const handleChange = useCallback((index: number, digit: string) => {
    if (disabled) return;
    const d = digit.replace(/[^0-9]/g, "").slice(-1);
    const arr = value.split("").concat(Array(length).fill("")).slice(0, length);
    arr[index] = d;
    const newVal = arr.join("").replace(/\s/g, "");
    if (onChange) onChange(newVal);
    else setInternalValue(newVal);
    if (d && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [value, length, disabled, onChange]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Backspace") {
      e.preventDefault();
      const arr = value.split("").concat(Array(length).fill("")).slice(0, length);
      if (arr[index]) {
        arr[index] = "";
        const newVal = arr.join("");
        if (onChange) onChange(newVal);
        else setInternalValue(newVal);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        arr[index - 1] = "";
        const newVal = arr.join("");
        if (onChange) onChange(newVal);
        else setInternalValue(newVal);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [value, length, disabled, onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    if (disabled) return;
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (onChange) onChange(pasted);
    else setInternalValue(pasted);
    const targetIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[targetIdx]?.focus();
  }, [length, disabled, onChange]);

  const isComplete = value.replace(/\s/g, "").length >= length;
  const showSuccess = success || (isComplete && !error && !disabled);

  return (
    <div
      className={`flex items-center ${sizeGaps[size]} ${className}`}
      style={style}
      onPaste={handlePaste}
    >
      {digits.map((digit, i) => {
        const hasDash = length > 4 && i === Math.floor(length / 2) - 1;
        return (
          <div key={i} className={`flex items-center ${sizeGaps[size]}`}>
            <input
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit || ""}
              disabled={disabled}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
              data-error={error || undefined}
              data-success={showSuccess || undefined}
              className={[
                sizeClasses[size],
                "text-center font-semibold font-[family-name:var(--font-mono)]",
                "rounded-[var(--glass-radius-sm,10px)]",
                "border-2 outline-none transition-all duration-150",
                "caret-transparent placeholder:text-[var(--theme-fg-faint)]",
                // Default state
                "border-[var(--theme-divider)] bg-[var(--theme-header-bg)] text-[var(--theme-fg)]",
                // Focus state
                "focus:border-[var(--theme-fg)] focus:bg-[var(--theme-table-bg)]",
                // Error overrides focus
                "data-[error=true]:border-[#FF3B30]",
                // Success overrides focus
                "data-[success=true]:border-[#34C759]",
                // Disabled
                disabled ? "opacity-50 cursor-not-allowed text-[var(--theme-fg-faint)]" : "cursor-text",
              ].join(" ")}
              placeholder="·"
            />
            {hasDash && (
              <span className="w-3 h-0.5 bg-[var(--theme-divider)] rounded-sm shrink-0" />
            )}
          </div>
        );
      })}
      {showSuccess && (
        <span
          className={[
            "flex items-center justify-center rounded-full bg-[#34C759] shrink-0 transition-all duration-200",
            size === "sm" ? "w-7 h-7 ml-1.5" : size === "md" ? "w-[35px] h-[35px] ml-2" : "w-10 h-10 ml-2.5",
          ].join(" ")}
        >
          <svg
            className={size === "sm" ? "w-2.5 h-2.5" : size === "md" ? "w-3 h-3" : "w-3.5 h-3.5"}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M3 8.5L6.5 12L13 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
}
