import { type CSSProperties } from "react";

interface ColorSwatchProps {
  color: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  showHex?: boolean;
  className?: string;
  style?: CSSProperties;
}

const sizeMap: Record<string, string> = {
  sm: "32px",
  md: "48px",
  lg: "64px",
};

export function ColorSwatch({
  color,
  label,
  size = "md",
  showHex = false,
  className = "",
  style,
}: ColorSwatchProps) {
  return (
    <div
      className={`prim-swatch ${className}`}
      style={{ "--swatch-size": sizeMap[size], ...style } as CSSProperties}
    >
      <div className="prim-swatch-color" style={{ background: color }} />
      {(label || showHex) && (
        <div className="prim-swatch-meta">
          {label && <span className="prim-swatch-label">{label}</span>}
          {showHex && <span className="prim-swatch-hex">{color}</span>}
        </div>
      )}
    </div>
  );
}
