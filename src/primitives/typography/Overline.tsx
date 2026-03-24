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

  const sizeMap = {
    sm: { fontSize: "9px", letterSpacing: "0.1em" },
    md: { fontSize: "10px", letterSpacing: "0.1em" },
    lg: { fontSize: "12px", letterSpacing: "0.08em" },
  };

  return (
    <span
      className={className}
      style={{
        display: "block",
        fontSize: sizeMap[size].fontSize,
        fontWeight: 650,
        textTransform: "uppercase" as const,
        letterSpacing: sizeMap[size].letterSpacing,
        fontFamily: "var(--font-ui)",
        color: muted
          ? isDark
            ? "rgba(255,255,255,0.4)"
            : "rgba(0,0,0,0.4)"
          : isDark
            ? "rgba(255,255,255,0.85)"
            : "rgba(0,0,0,0.85)",
        margin: 0,
        lineHeight: 1.4,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
