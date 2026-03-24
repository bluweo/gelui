import type { BaseProps } from "../types";

interface BadgeProps extends BaseProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

export function Badge({
  children,
  variant = "default",
  className = "",
  style,
}: BadgeProps) {
  const colors: Record<string, { bg: string; text: string }> = {
    default: { bg: "rgba(0,0,0,0.06)", text: "rgba(0,0,0,0.6)" },
    success: { bg: "rgba(52,199,89,0.15)", text: "#34C759" },
    warning: { bg: "rgba(255,149,0,0.15)", text: "#FF9500" },
    error: { bg: "rgba(255,59,48,0.15)", text: "#FF3B30" },
    info: { bg: "rgba(90,200,250,0.15)", text: "#5AC8FA" },
  };
  const c = colors[variant] ?? colors.default;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "11px",
        fontWeight: 600,
        padding: "3px 8px",
        borderRadius: "100px",
        background: c.bg,
        color: c.text,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
