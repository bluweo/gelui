import { type ReactNode, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface IconProps {
  children: ReactNode;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({
  children,
  size = 20,
  color,
  className = "",
  style,
}: IconProps) {
  const dark = useDarkMode();

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size}px`,
        lineHeight: 1,
        color: color ?? (dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)"),
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
