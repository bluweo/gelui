import type { BaseProps } from "../types";

interface GridProps extends BaseProps {
  cols?: number;
  gap?: string;
}

export function Grid({
  cols = 2,
  gap = "16px",
  children,
  className = "",
  style,
}: GridProps) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
