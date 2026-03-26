import { type CSSProperties, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function SearchInput({
  placeholder = "Search...",
  value: controlledValue,
  onChange,
  className = "",
  style,
}: SearchInputProps) {
  const [internal, setInternal] = useState("");
  const val = controlledValue ?? internal;
  const [focused, setFocused] = useState(false);

  const handleChange = (v: string) => {
    setInternal(v);
    onChange?.(v);
  };

  const strokeWidth = focused ? 2.5 : 1.5;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--theme-fg-muted)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          left: "14px",
          pointerEvents: "none",
          transition: "stroke-width 200ms ease",
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={val}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={className}
        style={{
          width: "100%",
          paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
          paddingLeft: "40px",
          paddingRight: val ? "36px" : "16px",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          borderRadius: "var(--glass-radius-sm, 10px)",
          border: `2px solid ${focused ? "var(--theme-bg-solid)" : "transparent"}`,
          background: "var(--theme-divider)",
          color: "var(--theme-bg-solid)",
          outline: "none",
          transition: "all 200ms ease",
          ...style,
        }}
      />
      {val && (
        <button
          onClick={() => handleChange("")}
          style={{
            position: "absolute",
            right: "12px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: "none",
            background: "var(--theme-ghost-border)",
            color: "var(--theme-bg-solid)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            padding: 0,
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
}
