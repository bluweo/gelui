import type { BaseProps } from "../types";

interface InlineProps extends BaseProps {
  gap?: string;
  align?: string;
}

export function Inline({
  gap = "12px",
  children,
  className = "",
  style,
  align = "center",
}: InlineProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        gap,
        alignItems: align,
        flexWrap: "wrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
