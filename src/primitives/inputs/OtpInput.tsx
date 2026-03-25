import { useState, useRef, useCallback, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  const isDark = useDarkMode();
  const [internalValue, setInternalValue] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const value = controlledValue ?? internalValue;
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const sizes = {
    sm: { w: 36, h: 40, font: 16, gap: 6, radius: 8 },
    md: { w: 44, h: 50, font: 20, gap: 8, radius: 10 },
    lg: { w: 52, h: 58, font: 24, gap: 10, radius: 12 },
  };
  const s = sizes[size];

  const handleChange = useCallback((index: number, digit: string) => {
    if (disabled) return;
    // Only allow single digit
    const d = digit.replace(/[^0-9]/g, "").slice(-1);
    const arr = value.split("").concat(Array(length).fill("")).slice(0, length);
    arr[index] = d;
    const newVal = arr.join("").replace(/\s/g, "");
    if (onChange) onChange(newVal);
    else setInternalValue(newVal);
    // Auto-focus next
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
    // Focus last filled or next empty
    const targetIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[targetIdx]?.focus();
  }, [length, disabled, onChange]);

  const borderDefault = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const borderFocus = isDark ? "#fff" : "#000";
  const borderError = "#FF3B30";
  const borderSuccess = "#34C759";
  const bgDefault = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)";
  const bgFocus = isDark ? "rgba(255,255,255,0.1)" : "#ffffff";
  const textColor = isDark ? "#fff" : "#000";

  const isComplete = value.replace(/\s/g, "").length >= length;
  const showSuccess = success || (isComplete && !error && !disabled);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        gap: s.gap,
        alignItems: "center",
        ...style,
      }}
      onPaste={handlePaste}
    >
      {digits.map((digit, i) => {
        const isFocused = focusedIndex === i;
        const hasDash = length > 4 && i === Math.floor(length / 2) - 1;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: s.gap }}>
            <input
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit || ""}
              disabled={disabled}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(-1)}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
              style={{
                width: s.w,
                height: s.h,
                textAlign: "center",
                fontSize: s.font,
                fontWeight: 650,
                fontFamily: "var(--font-mono)",
                color: disabled ? (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)") : textColor,
                background: isFocused ? bgFocus : bgDefault,
                border: `2px solid ${error ? borderError : showSuccess ? borderSuccess : isFocused ? borderFocus : borderDefault}`,
                borderRadius: `var(--glass-radius-sm, ${s.radius}px)`,
                outline: "none",
                transition: "all 0.15s ease",
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? "not-allowed" : "text",
                caretColor: "transparent",
              }}
              placeholder="·"
            />
            {hasDash && (
              <span style={{
                width: 12,
                height: 2,
                background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
                borderRadius: 1,
                flexShrink: 0,
              }} />
            )}
          </div>
        );
      })}
      {/* Success checkmark */}
      {showSuccess && (
        <span style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: s.h * 0.7,
          height: s.h * 0.7,
          borderRadius: "50%",
          background: "#34C759",
          flexShrink: 0,
          marginLeft: s.gap,
          transition: "all 0.2s ease",
        }}>
          <svg width={s.font * 0.6} height={s.font * 0.6} viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5L6.5 12L13 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
}
