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
  const baseClasses = `prim-btn-base prim-btn-${size} prim-btn-${shape}`;

  const variantClasses =
    variant === "gel"
      ? `gel-btn ${shape === "circle" ? "gel-btn-circle-sm" : "gel-btn-pill"}`
      : `prim-btn-${variant}`;

  const fullClass = fullWidth ? "prim-btn-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${fullClass} ${className}`}
      style={style}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      data-disabled={disabled}
    >
      {children}
    </button>
  );
}
