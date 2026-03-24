import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  const dark = useDarkMode();
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "6px",
        borderRadius: "3px",
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          height: "100%",
          borderRadius: "3px",
          background: dark ? "#b0c4af" : "#354334",
          transition: "width 300ms ease",
        }}
      />
    </div>
  );
}
