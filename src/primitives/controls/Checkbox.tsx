import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export function Checkbox({
  checked = false,
  onChange,
  className = "",
  style,
}: CheckboxProps) {
  const dark = useDarkMode();
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
          : `2px solid ${dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"}`,
        background: checked ? (dark ? "#b0c4af" : "#354334") : "transparent",
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
          stroke={dark ? "#000" : "#fff"}
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
    </button>
  );
}
