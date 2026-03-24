import type { BaseProps } from "../types";

interface HeadingProps extends BaseProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({
  level = 1,
  children,
  className = "",
  style,
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizes: Record<number, string> = {
    1: "36px",
    2: "30px",
    3: "24px",
    4: "20px",
    5: "17px",
    6: "15px",
  };
  const weights: Record<number, number> = {
    1: 750,
    2: 700,
    3: 650,
    4: 600,
    5: 600,
    6: 600,
  };
  return (
    <Tag
      className={className}
      style={{
        fontSize: sizes[level],
        fontWeight: weights[level],
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
        fontFamily: "var(--font-heading)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
