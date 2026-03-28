import { type CSSProperties } from "react";

interface SpinnerProps {
  size?: string;
  className?: string;
  style?: CSSProperties;
}

const borderWidthMap: Record<string, string> = {
  "16px": "3px",
  "24px": "4px",
  "32px": "5px",
};

export function Spinner({ size = "24px", className = "", style }: SpinnerProps) {
  const bw = borderWidthMap[size] ?? "3px";
  return (
    <div
      className={`rounded-full border-[var(--theme-fg-faint)] border-t-[var(--theme-fg)] animate-spin ${className}`}
      style={{ width: size, height: size, borderWidth: bw, borderStyle: "solid", ...style }}
    />
  );
}
