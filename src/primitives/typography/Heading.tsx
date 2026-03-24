import type { BaseProps } from "../types";

interface HeadingProps extends BaseProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  display?: boolean;
}

export function Heading({
  level = 1,
  display = false,
  children,
  className = "",
  style,
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // CSS variable keys map to Type Presets
  const varMap: Record<number, string> = {
    1: "h1", 2: "h2", 3: "h3", 4: "h4", 5: "h5", 6: "h6",
  };
  const fallbackSizes: Record<number, string> = { 1: "30px", 2: "24px", 3: "20px", 4: "17px", 5: "15px", 6: "13px" };
  const fallbackWeights: Record<number, number> = { 1: 750, 2: 700, 3: 650, 4: 600, 5: 600, 6: 600 };

  const key = varMap[level];
  const displayStyle = display
    ? {
        fontSize: `var(--type-display-size, 36px)`,
        fontWeight: `var(--type-display-weight, 750)` as any,
        lineHeight: `var(--type-display-lh, 1.1)`,
        letterSpacing: `var(--type-display-ls, -0.035em)`,
      }
    : {
        fontSize: `var(--type-${key}-size, ${fallbackSizes[level]})`,
        fontWeight: `var(--type-${key}-weight, ${fallbackWeights[level]})` as any,
        lineHeight: `var(--type-${key}-lh, 1.2)`,
        letterSpacing: `var(--type-${key}-ls, -0.02em)`,
      };

  return (
    <Tag
      className={className}
      style={{
        ...displayStyle,
        fontFamily: "var(--font-heading)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
