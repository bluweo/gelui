import { type ReactNode, type CSSProperties } from "react";

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
    | "frostedSlit"
    | "dots";
  direction?: "horizontal" | "vertical";
  label?: string;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const VARIANT_CLASSES: Record<string, string> = {
  default: "prim-divider-default",
  bold: "prim-divider-bold",
  dashed: "prim-divider-dashed",
  gradient: "prim-divider-gradient",
  glass: "prim-divider-glass",
  etched: "prim-divider-etched",
  groove: "prim-divider-groove",
  ridge: "prim-divider-ridge",
  frostedSlit: "prim-divider-frosted",
  dots: "prim-divider-dots",
};

export function Divider({
  variant = "default",
  direction = "horizontal",
  label,
  icon,
  className = "",
  style,
}: DividerProps) {
  const isVertical = direction === "vertical";

  // Label or icon divider
  if (label || icon) {
    return (
      <div
        className={`prim-divider-labeled ${className}`}
        style={style}
      >
        <div className="prim-divider-default flex-1" />
        {icon ? (
          <span className="prim-divider-icon">{icon}</span>
        ) : (
          <span className="prim-divider-label">{label}</span>
        )}
        <div className="prim-divider-default flex-1" />
      </div>
    );
  }

  // Dots variant
  if (variant === "dots") {
    return (
      <div className={`prim-divider-dots ${className}`} style={style}>
        <span /><span /><span />
      </div>
    );
  }

  // Vertical divider
  if (isVertical) {
    return (
      <div
        className={`prim-divider-vertical ${className}`}
        style={style}
      />
    );
  }

  // Standard horizontal divider
  return (
    <div
      className={`${VARIANT_CLASSES[variant] || VARIANT_CLASSES.default} ${className}`}
      style={style}
    />
  );
}
