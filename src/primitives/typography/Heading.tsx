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

  // Display variant: larger, heavier, tighter tracking — for hero/banner titles
  const displayStyle = display
    ? {
        fontSize: "44px",
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
      }
    : {
        fontSize: sizes[level],
        fontWeight: weights[level],
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
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
