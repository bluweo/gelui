import { type CSSProperties } from "react";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  variant?: "flat" | "gel";
  className?: string;
  style?: CSSProperties;
}

export function Checkbox({
  checked = false,
  onChange,
  variant = "flat",
  className = "",
  style,
}: CheckboxProps) {
  if (variant === "gel") {
    return (
      <button
        className={`gel-glass ${className}`}
        onClick={() => onChange?.(!checked)}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "6px",
          border: checked ? "none" : "1px solid rgba(255,255,255,0.6)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 200ms",
          padding: 0,
          background: checked
            ? "linear-gradient(165deg, rgba(53,67,52,0.9) 0%, rgba(53,67,52,0.7) 100%)"
            : "linear-gradient(165deg, rgba(255,255,255,0.7) 0%, rgba(240,240,244,0.5) 100%)",
          boxShadow: checked
            ? "inset 0 2px 4px rgba(0,0,0,0.25), inset 0 -1px 2px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.1)"
            : `0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06),
               inset 0 2px 3px rgba(255,255,255,0.8),
               inset 0 -2px 3px rgba(0,0,0,0.04),
               inset 2px 0 3px rgba(255,255,255,0.4),
               inset -2px 0 3px rgba(0,0,0,0.03)`,
          ...style,
        }}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
    );
  }

  // flat (default)
  return (
    <button
      className={className}
      onClick={() => onChange?.(!checked)}
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "4px",
        border: checked
          ? "none"
          : "2px solid var(--theme-fg-faint)",
        background: checked ? "#354334" : "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 200ms",
        padding: 0,
        ...style,
      }}
    >
      {checked && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--theme-fg-on-solid)"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
    </button>
  );
}
