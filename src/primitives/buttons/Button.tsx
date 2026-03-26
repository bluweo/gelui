import type { CSSProperties } from "react";
import type { BaseProps } from "../types";

interface ButtonProps extends BaseProps {
  variant?: "solid" | "ghost" | "glass" | "gel" | "link";
  size?: "sm" | "md" | "lg";
  shape?: "pill" | "rounded" | "circle";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

/* Safelist for Tailwind v4 — template literals can't be scanned */
const SIZE_CLASSES: Record<string, string> = {
  sm: "prim-btn-sm",
  md: "prim-btn-md",
  lg: "prim-btn-lg",
};
const SHAPE_CLASSES: Record<string, string> = {
  pill: "prim-btn-pill",
  rounded: "prim-btn-rounded",
  circle: "prim-btn-circle",
};
const VARIANT_CLASSES: Record<string, string> = {
  solid: "prim-btn-solid",
  ghost: "prim-btn-ghost",
  glass: "prim-btn-glass",
  link: "prim-btn-link",
  gel: "gel-btn",
};

export function Button({
  variant = "solid",
  size = "md",
  shape = "pill",
  disabled = false,
  fullWidth = false,
  children,
  className = "",
  style,
  onClick,
}: ButtonProps) {
  // Circle shapes define their own size — skip size padding class
  const sizeClass = shape === "circle" ? "" : (SIZE_CLASSES[size] || SIZE_CLASSES.md);
  const shapeClass = SHAPE_CLASSES[shape] || SHAPE_CLASSES.pill;

  const variantClasses =
    variant === "gel"
      ? `gel-btn ${shape === "circle" ? "gel-btn-circle-sm" : "gel-btn-pill"}`
      : VARIANT_CLASSES[variant] || VARIANT_CLASSES.solid;

  const fullClass = fullWidth ? "prim-btn-full" : "";

  return (
    <button
      className={`prim-btn-base ${sizeClass} ${shapeClass} ${variantClasses} ${fullClass} ${className}`}
      style={style}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      data-disabled={disabled}
    >
      {children}
    </button>
  );
}
