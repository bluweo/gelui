import { type CSSProperties } from "react";

interface ColorSwatchProps {
  color: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  showHex?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ColorSwatch({
  color,
  label,
  size = "md",
  showHex = false,
  className = "",
  style,
}: ColorSwatchProps) {
  const sizeMap: Record<string, number> = {
    sm: 32,
    md: 48,
    lg: 64,
  };
  const dim = sizeMap[size];

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        ...style,
      }}
    >
      <div
        style={{
          width: `${dim}px`,
          height: `${dim}px`,
          borderRadius: "var(--glass-radius-sm, 10px)",
          background: color,
          border: `1px solid var(--theme-divider)`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      />
      {(label || showHex) && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1px",
          }}
        >
          {label && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                fontFamily: "var(--font-ui)",
                color: "var(--theme-fg-muted)",
              }}
            >
              {label}
            </span>
          )}
          {showHex && (
            <span
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                color: "var(--theme-fg-subtle)",
              }}
            >
              {color}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
