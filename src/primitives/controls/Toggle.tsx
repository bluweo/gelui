import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface ToggleProps {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  variant?: "flat" | "gel";
  className?: string;
  style?: CSSProperties;
}

export function Toggle({
  checked = false,
  onChange,
  variant = "flat",
  className = "",
  style,
}: ToggleProps) {
  const dark = useDarkMode();

  if (variant === "gel") {
    return (
      <button
        className={`gel-glass ${className}`}
        onClick={() => onChange?.(!checked)}
        style={{
          position: "relative",
          width: "48px",
          height: "28px",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          transition: "all 300ms",
          background: checked
            ? "linear-gradient(180deg, rgba(53,67,52,0.9) 0%, rgba(53,67,52,0.7) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 100%)",
          boxShadow: checked
            ? "inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.1)"
            : "inset 0 2px 4px rgba(0,0,0,0.08), inset 0 -1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.05)",
          padding: 0,
          ...style,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "3px",
            left: checked ? "calc(100% - 25px)" : "3px",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            transition: "all 300ms",
            background:
              "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(240,240,244,0.85) 40%, rgba(220,220,228,0.75) 100%)",
            border: "1.5px solid rgba(255,255,255,0.9)",
            boxShadow: `
              0 2px 8px rgba(0,0,0,0.15),
              0 1px 3px rgba(0,0,0,0.1),
              inset 0 2px 3px rgba(255,255,255,1),
              inset 0 -2px 4px rgba(0,0,0,0.06),
              inset 2px 0 3px rgba(255,255,255,0.5),
              inset -2px 0 3px rgba(0,0,0,0.04)
            `,
          }}
        />
      </button>
    );
  }

  // flat (default)
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
