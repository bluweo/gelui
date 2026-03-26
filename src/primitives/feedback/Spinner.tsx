import { type CSSProperties } from "react";

interface SpinnerProps {
  size?: string;
  className?: string;
  style?: CSSProperties;
}

export function Spinner({ size = "24px", className = "", style }: SpinnerProps) {
  return (
    <div
      className={`rounded-full border-[2.5px] border-[var(--theme-fg-faint)] border-t-[var(--theme-fg)] animate-spin ${className}`}
      style={{ width: size, height: size, ...style }}
    />
  );
}
