import { type CSSProperties } from "react";

interface ColorSwatchProps {
  color: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  showHex?: boolean;
  variant?: "default" | "card";
  textColor?: "light" | "dark" | "auto";
  className?: string;
  style?: CSSProperties;
}

const sizeMap: Record<string, string> = {
  sm: "32px",
  md: "48px",
  lg: "64px",
};

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function isLightColor(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

export function ColorSwatch({
  color,
  label,
  size = "md",
  showHex = false,
  variant = "default",
  textColor = "auto",
  className = "",
  style,
}: ColorSwatchProps) {
  if (variant === "card") {
    const isDark = textColor === "dark" || (textColor === "auto" && isLightColor(color));
    const textCls = isDark ? "text-black/80" : "text-white/90";
    const subCls = isDark ? "text-black/50" : "text-white/60";

    return (
      <div
        className={`rounded-[var(--glass-radius-sm,10px)] p-3 flex flex-col justify-between min-h-[80px] ${className}`}
        style={{ background: color, ...style }}
      >
        <span className={`text-[12px] font-semibold font-[family-name:var(--font-ui)] ${textCls}`}>
          {label}
        </span>
        <div className="flex flex-col gap-0.5 mt-auto">
          <span className={`text-[9px] font-mono ${subCls}`}>
            Hex: {color.toUpperCase()}
          </span>
          <span className={`text-[9px] font-mono ${subCls}`}>
            RGB: ({hexToRgb(color)})
          </span>
        </div>
      </div>
    );
  }

  // default variant — circle/square with label below
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
