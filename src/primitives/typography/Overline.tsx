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
      className={className}
      style={{
        display: "block",
        fontSize: `var(--type-overline-size, 10px)`,
        fontWeight: `var(--type-overline-weight, 650)` as any,
        textTransform: "uppercase" as const,
        letterSpacing: `var(--type-overline-ls, 0.1em)`,
        lineHeight: `var(--type-overline-lh, 1.2)`,
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
