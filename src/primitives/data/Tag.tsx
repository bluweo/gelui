import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface TagProps {
  label: string;
  color?: "default" | "blue" | "green" | "red" | "orange" | "purple";
  onRemove?: () => void;
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
}

export function Tag({
  label,
  color = "default",
  onRemove,
  size = "md",
  className = "",
  style,
}: TagProps) {
  const dark = useDarkMode();
  const colorMap: Record<string, { bg: string; text: string }> = {
    default: {
      bg: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
      text: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
    },
    blue: { bg: "rgba(0,122,255,0.12)", text: "#007AFF" },
    green: { bg: "rgba(52,199,89,0.12)", text: "#34C759" },
    red: { bg: "rgba(255,59,48,0.12)", text: "#FF3B30" },
    orange: { bg: "rgba(255,149,0,0.12)", text: "#FF9500" },
    purple: { bg: "rgba(175,82,222,0.12)", text: "#AF52DE" },
  };
  const c = colorMap[color] ?? colorMap.default;
  const isSm = size === "sm";

  return (
    <span
      className={`type-caption ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: isSm ? "2px 8px" : "4px 10px",
        borderRadius: "var(--glass-radius-pill, 100px)",
        background: c.bg,
        color: c.text,
        ...style,
      }}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: 0,
            fontSize: isSm ? "12px" : "14px",
            lineHeight: 1,
            color: "inherit",
            opacity: 0.6,
            display: "flex",
            alignItems: "center",
          }}
        >
          &times;
        </button>
      )}
    </span>
  );
}
