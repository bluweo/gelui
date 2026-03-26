import { type CSSProperties } from "react";

interface TagProps {
  label: string;
  color?: "default" | "blue" | "green" | "red" | "orange" | "purple";
  onRemove?: () => void;
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
}

const colorMap: Record<string, { bg: string; text: string }> = {
  default: { bg: "var(--theme-divider)", text: "var(--theme-fg)" },
  blue: { bg: "rgba(0,122,255,0.12)", text: "#007AFF" },
  green: { bg: "rgba(52,199,89,0.12)", text: "#34C759" },
  red: { bg: "rgba(255,59,48,0.12)", text: "#FF3B30" },
  orange: { bg: "rgba(255,149,0,0.12)", text: "#FF9500" },
  purple: { bg: "rgba(175,82,222,0.12)", text: "#AF52DE" },
};

export function Tag({
  label,
  color = "default",
  onRemove,
  size = "md",
  className = "",
  style,
}: TagProps) {
  const c = colorMap[color] ?? colorMap.default;

  return (
    <span
      className={`prim-tag type-caption ${className}`}
      data-size={size !== "md" ? size : undefined}
      style={{ "--tag-bg": c.bg, "--tag-text": c.text, ...style } as CSSProperties}
    >
      {label}
      {onRemove && (
        <button onClick={onRemove} className="prim-tag-remove">
          &times;
        </button>
      )}
    </span>
  );
}
