import type { BaseProps } from "../types";

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
  return (
    <span
      className={`type-overline ${className}`}
      style={{
        display: "block",
        fontFamily: "var(--font-ui)",
        color: muted
          ? "var(--theme-fg-muted)"
          : "var(--theme-fg)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
