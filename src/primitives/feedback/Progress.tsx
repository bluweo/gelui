import { type CSSProperties } from "react";

interface ProgressProps {
  value?: number;
  className?: string;
  style?: CSSProperties;
}

export function Progress({
  value = 60,
  className = "",
  style,
}: ProgressProps) {
  return (
    <div
      className={`w-full h-1.5 rounded-full bg-[var(--theme-fg-faint)] overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="h-full rounded-full bg-[var(--theme-fg)] transition-[width] duration-300 ease-in-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
