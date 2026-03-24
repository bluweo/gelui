import type { BaseProps } from "../types";

interface StackProps extends BaseProps {
  gap?: string;
}

export function Stack({
  gap = "12px",
  children,
  className = "",
  style,
}: StackProps) {
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap, ...style }}
    >
      {children}
    </div>
  );
}
