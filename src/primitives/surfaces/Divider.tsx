import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface DividerProps {
  variant?:
    | "default"
    | "bold"
    | "dashed"
    | "gradient"
    | "glass"
    | "etched"
    | "groove"
    | "ridge"
    | "frostedSlit";
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Divider({
  variant = "default",
  label,
  className = "",
  style,
}: DividerProps) {
  const dark = useDarkMode();
  if (label) {
    return (
      <div
        className={`flex items-center gap-3 ${className}`}
        style={style}
      >
        <div
          style={{
            flex: 1,
            height: "1px",
            background: dark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            opacity: 0.4,
            textTransform: "uppercase" as const,
          }}
        >
          {label}
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: dark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          }}
        />
      </div>
    );
  }

  const w = dark ? "255,255,255" : "0,0,0";
  const wInv = dark ? "0,0,0" : "255,255,255";

  const styles: Record<string, CSSProperties> = {
    default: { height: "1px", background: `rgba(${w},0.08)` },
    bold: { height: "2px", background: `rgba(${w},0.15)` },
    dashed: {
      height: "1px",
      borderBottom: `1px dashed rgba(${w},0.15)`,
      background: "transparent",
    },
    gradient: {
      height: "1px",
      background: `linear-gradient(90deg, transparent, rgba(${w},0.12), transparent)`,
    },
    glass: {
      height: "2px",
      background: `linear-gradient(to bottom, rgba(${wInv},0.4), rgba(${w},0.08))`,
    },
    etched: {
      height: "0px",
      boxShadow: `0 -1px 0 rgba(${w},0.08), 0 1px 0 rgba(${wInv},0.15)`,
    },
    groove: {
      height: "0px",
      boxShadow: `0 -1px 0 rgba(${w},0.12), 0 1px 0 rgba(${wInv},0.2), 0 -2px 0 rgba(${wInv},0.08), 0 2px 0 rgba(${w},0.05)`,
    },
    ridge: {
      height: "0px",
      boxShadow: `0 -1px 0 rgba(${wInv},0.2), 0 1px 0 rgba(${w},0.12), 0 -2px 0 rgba(${w},0.05), 0 2px 0 rgba(${wInv},0.08)`,
    },
    frostedSlit: {
      height: "1px",
      background: `linear-gradient(90deg, transparent 5%, rgba(${wInv},0.25) 30%, rgba(${wInv},0.35) 50%, rgba(${wInv},0.25) 70%, transparent 95%)`,
      boxShadow: `0 1px 2px rgba(${w},0.1)`,
    },
  };

  return (
    <div
      className={className}
      style={{ width: "100%", ...styles[variant], ...style }}
    />
  );
}
