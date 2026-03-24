import { type CSSProperties, useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface TextareaProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function Textarea({
  placeholder = "",
  rows = 3,
  value,
  onChange,
  className = "",
  style,
}: TextareaProps) {
  const dark = useDarkMode();
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={className}
      style={{
        width: "100%",
        padding: "12px 16px",
        fontSize: "14px",
        fontFamily: "var(--font-body)",
        borderRadius: "var(--glass-radius-sm, 10px)",
        border: `2px solid ${focused ? (dark ? "#fff" : "#000") : "transparent"}`,
        background: dark
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.6)",
        color: dark ? "#fff" : "#000",
        outline: "none",
        resize: "vertical",
        transition: "all 200ms ease",
        ...style,
      }}
    />
  );
}
