import type { BaseProps } from "../types";

interface TextProps extends BaseProps {
  size?: "xs" | "sm" | "md" | "lg";
  weight?: number;
}

export function Text({
  size = "md",
  weight,
  children,
  className = "",
  style,
}: TextProps) {
  // sm maps to "body-sm" preset, md maps to "body" preset
  const varKey = size === "sm" ? "body-sm" : "body";
  const fallbackSize = size === "sm" ? "13px" : "15px";
  const fallbackWeight = size === "sm" ? 450 : 450;

  return (
    <p
      suppressHydrationWarning
      className={className}
      style={{
        fontSize: `var(--type-${varKey}-size, ${fallbackSize})`,
        fontWeight: weight ?? `var(--type-${varKey}-weight, ${fallbackWeight})` as any,
        lineHeight: `var(--type-${varKey}-lh, 1.6)`,
        letterSpacing: `var(--type-${varKey}-ls, 0)`,
        fontFamily: "var(--font-body)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
