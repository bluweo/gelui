import type { CSSProperties } from "react";
import type { BaseProps } from "../types";

interface BadgeProps extends BaseProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const colors: Record<string, { bg: string; text: string }> = {
  default: { bg: "var(--theme-badge-bg)", text: "var(--theme-badge-text)" },
  success: { bg: "rgba(52,199,89,0.15)", text: "#34C759" },
  warning: { bg: "rgba(255,149,0,0.15)", text: "#FF9500" },
  error: { bg: "rgba(255,59,48,0.15)", text: "#FF3B30" },
  info: { bg: "rgba(90,200,250,0.15)", text: "#5AC8FA" },
};

export function Badge({
  children,
  variant = "default",
  className = "",
  style,
}: BadgeProps) {
  const c = colors[variant] ?? colors.default;
  return (
    <span
      className={`prim-badge type-caption ${className}`}
      style={{ "--badge-bg": c.bg, "--badge-text": c.text, ...style } as CSSProperties}
    >
      {children}
    </span>
  );
}
