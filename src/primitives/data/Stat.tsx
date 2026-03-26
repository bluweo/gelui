import { type ReactNode, type CSSProperties } from "react";

interface StatProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  style?: CSSProperties;
}

function TrendArrow({ direction }: { direction: "up" | "down" | "neutral" }) {
  if (direction === "neutral") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  const isUp = direction === "up";
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d={isUp ? "M6 10V2M6 2l3.5 3.5M6 2L2.5 5.5" : "M6 2v8M6 10l3.5-3.5M6 10L2.5 6.5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const trendColors: Record<string, string> = {
  up: "#34C759",
  down: "#FF3B30",
  neutral: "#8E8E93",
};

export function Stat({
  value,
  label,
  icon,
  trend,
  trendValue,
  className = "",
  style,
}: StatProps) {
  return (
    <div className={`prim-stat ${className}`} style={style}>
      {icon && <span className="prim-stat-icon">{icon}</span>}
      <div className="flex items-baseline gap-2">
        <span className="prim-stat-value">{value}</span>
        {trend && (
          <span
            className="prim-stat-trend"
            style={{ color: trendColors[trend] }}
          >
            <TrendArrow direction={trend} />
            {trendValue}
          </span>
        )}
      </div>
      <span className="prim-stat-label">{label}</span>
    </div>
  );
}
