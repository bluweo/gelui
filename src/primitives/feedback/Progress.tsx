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
      className={className}
      style={{
        width: "100%",
        height: "6px",
        borderRadius: "3px",
        background: "var(--theme-fg-faint)",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          height: "100%",
          borderRadius: "3px",
          background: "var(--theme-fg)",
          transition: "width 300ms ease",
        }}
      />
    </div>
  );
}
