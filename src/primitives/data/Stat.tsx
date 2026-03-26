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

const trendColors = {
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
    <div
      className={className}
      style={{
        padding: "20px",
        borderRadius: "var(--glass-radius-sm, 10px)",
        background: "var(--theme-header-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid var(--theme-divider)`,
        fontFamily: "var(--font-body)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...style,
      }}
    >
      {icon && (
        <span
          style={{
            display: "flex",
            color: "var(--theme-fg-subtle)",
            marginBottom: "4px",
          }}
        >
          {icon}
        </span>
      )}
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <span
          style={{
            fontSize: "32px",
            fontWeight: 700,
            fontFamily: "var(--font-ui)",
            color: "var(--theme-fg)",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </span>
        {trend && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              color: trendColors[trend],
            }}
          >
            <TrendArrow direction={trend} />
            {trendValue}
          </span>
        )}
      </div>
      <span
        style={{
          fontSize: "12px",
          fontWeight: 500,
          fontFamily: "var(--font-ui)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "var(--theme-fg-subtle)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
