import type { BaseProps } from "../types";

interface TextProps extends BaseProps {
  size?: "xs" | "sm" | "md" | "lg";
  weight?: number;
}

export function Text({
  size = "md",
  weight = 400,
  children,
  className = "",
  style,
}: TextProps) {
  const sizeMap: Record<string, string> = {
    xs: "12px",
    sm: "13px",
    md: "15px",
    lg: "18px",
  };
  return (
    <p
      className={className}
      style={{
        fontSize: sizeMap[size],
        fontWeight: weight,
        lineHeight: 1.6,
        fontFamily: "var(--font-body)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
