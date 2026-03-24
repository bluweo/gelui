import type { BaseProps } from "../types";

export function Label({ children, className = "", style }: BaseProps) {
  return (
    <span
      className={className}
      style={{
        fontSize: `var(--type-label-size, 13px)`,
        fontWeight: `var(--type-label-weight, 600)` as any,
        lineHeight: `var(--type-label-lh, 1)`,
        letterSpacing: `var(--type-label-ls, 0.02em)`,
        fontFamily: "var(--font-ui)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
