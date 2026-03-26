import { type CSSProperties, useState } from "react";

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
        border: `2px solid ${focused ? "var(--theme-bg-solid)" : "transparent"}`,
        background: "var(--theme-divider)",
        color: "var(--theme-bg-solid)",
        outline: "none",
        resize: "vertical",
        transition: "all 200ms ease",
        ...style,
      }}
    />
  );
}
