import { type ReactNode, type CSSProperties } from "react";

interface StatProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  iconColor?: string;
  iconBg?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  trendLabel?: string;
  className?: string;
  style?: CSSProperties;
}

function TrendIcon({ direction }: { direction: "up" | "down" | "neutral" }) {
  if (direction === "neutral") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (direction === "up") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 12l4-4 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 6h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 4l4 4 2-2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10h3v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  iconColor = "var(--theme-fg)",
  iconBg = "var(--theme-header-bg)",
  trend,
  trendValue,
  trendLabel = "VS PREV. 28 DAYS",
  className = "",
  style,
}: StatProps) {
  const cardStyle: CSSProperties = iconColor && iconColor !== "var(--theme-fg)"
    ? {
        background: `linear-gradient(135deg, color-mix(in srgb, ${iconColor} 8%, var(--stat-card-bg, #fff)), var(--stat-card-bg, #fff))`,
        ...style,
      }
    : { ...style };

  return (
    <div className={`prim-stat ${className}`} style={cardStyle}>
      {/* Top row: label + icon */}
      <div className="flex items-start justify-between">
        <span className="prim-stat-label">{label}</span>
        {icon && (
          <span
            className="prim-stat-icon-badge"
            style={{ color: iconColor, background: iconBg }}
          >
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <span className="prim-stat-value">{value}</span>

      {/* Trend row */}
      {trend && (
        <div className="prim-stat-trend-row">
          <span className="prim-stat-trend" style={{ color: trendColors[trend] }}>
            <TrendIcon direction={trend} />
            {trendValue}
          </span>
          {trendLabel && (
            <span className="prim-stat-trend-label">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
