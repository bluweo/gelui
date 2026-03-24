import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface ToggleProps {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export function Toggle({
  checked = false,
  onChange,
  className = "",
  style,
}: ToggleProps) {
  const dark = useDarkMode();
  return (
    <button
      className={className}
      onClick={() => onChange?.(!checked)}
      style={{
        width: "44px",
        height: "24px",
        borderRadius: "12px",
        border: "none",
        padding: "2px",
        cursor: "pointer",
        transition: "all 200ms",
        background: checked
          ? dark
            ? "#b0c4af"
            : "#354334"
          : dark
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        ...style,
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          transition: "all 200ms",
        }}
      />
    </button>
  );
}
