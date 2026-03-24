import type { BaseProps } from "../types";
import { useDarkMode } from "../hooks/useDarkMode";

interface OverlineProps extends BaseProps {
  size?: "sm" | "md" | "lg";
  muted?: boolean;
}

export function Overline({
  size = "md",
  muted = true,
  children,
  className = "",
  style,
}: OverlineProps) {
  const isDark = useDarkMode();

  return (
    <span
      className={`type-overline ${className}`}
      style={{
        display: "block",
        fontFamily: "var(--font-ui)",
        color: muted
          ? isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"
          : isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
