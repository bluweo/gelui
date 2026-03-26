import { type ReactNode, type CSSProperties } from "react";

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
        color: color ?? "var(--theme-fg-muted)",
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
