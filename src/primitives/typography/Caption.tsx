import type { BaseProps } from "../types";

export function Caption({ children, className = "", style }: BaseProps) {
  return (
    <span
      className={className}
      style={{
        fontSize: "11px",
        fontWeight: 400,
        opacity: 0.5,
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
