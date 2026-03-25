import type { BaseProps } from "../types";

export function Caption({ children, className = "", style }: BaseProps) {
  return (
    <span
      suppressHydrationWarning
      className={className}
      style={{
        fontSize: `var(--type-caption-size, 11.5px)`,
        fontWeight: `var(--type-caption-weight, 500)` as any,
        lineHeight: `var(--type-caption-lh, 1.4)`,
        letterSpacing: `var(--type-caption-ls, 0.02em)`,
        opacity: 0.5,
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
