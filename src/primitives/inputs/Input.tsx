import { type ReactNode, type CSSProperties, useState } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Input({
  placeholder = "",
  value,
  onChange,
  type = "text",
  size = "md",
  error = false,
  success = false,
  disabled = false,
  icon,
  className = "",
  style,
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const sizeMap = {
    sm: { py: "8px", px: "12px", fs: "12px" },
    md: { py: "12px", px: "16px", fs: "14px" },
    lg: { py: "16px", px: "20px", fs: "16px" },
  };
  const s = sizeMap[size];

  const borderColor = error
    ? "rgba(255,59,48,0.7)"
    : success
      ? "rgba(52,199,89,0.7)"
      : focused
        ? "var(--theme-bg-solid)"
        : "transparent";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      {icon && (
        <span
          style={{
            position: "absolute",
            left: s.px,
            display: "flex",
            pointerEvents: "none",
            opacity: 0.5,
          }}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={className}
        style={{
          width: "100%",
          padding: `${s.py} ${s.px}`,
          paddingLeft: icon ? "40px" : s.px,
          paddingRight: error || success ? "40px" : s.px,
          fontSize: s.fs,
          fontFamily: "var(--font-body)",
          borderRadius: "var(--glass-radius-sm, 10px)",
          border: `2px solid ${borderColor}`,
          background: "var(--theme-divider)",
          color: "var(--theme-bg-solid)",
          outline: "none",
          transition: "all 200ms ease",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          ...style,
        }}
      />
      {error && (
        <span
          style={{
            position: "absolute",
            right: "14px",
            color: "rgba(255,59,48,0.8)",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          &#x2717;
        </span>
      )}
      {success && !error && (
        <span
          style={{
            position: "absolute",
            right: "14px",
            color: "rgba(52,199,89,0.8)",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          &#x2713;
        </span>
      )}
    </div>
  );
}
