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
        className={`prim-checkbox-gel gel-glass ${className}`}
        onClick={() => onChange?.(!checked)}
        data-checked={checked}
        style={style}
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
      className={`prim-checkbox-flat ${className}`}
      onClick={() => onChange?.(!checked)}
      data-checked={checked}
      style={style}
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
