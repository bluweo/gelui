import type { BaseProps } from "../types";

interface SurfaceProps extends BaseProps {
  level?: 0 | 1 | 2 | 3;
}

export function Surface({
  level = 1,
  children,
  className = "",
  style,
}: SurfaceProps) {
  return (
    <div
      className={`glass-${level} rounded-[var(--glass-radius,16px)] p-4 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
