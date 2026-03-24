import type { BaseProps } from "../types";

export function Label({ children, className = "", style }: BaseProps) {
  return (
    <span
      className={className}
      style={{
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase" as const,
        fontFamily: "var(--font-ui)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
