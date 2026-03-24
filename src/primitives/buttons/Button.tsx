import { type CSSProperties, useState } from "react";
import type { BaseProps } from "../types";
import { useDarkMode } from "../hooks/useDarkMode";

interface ButtonProps extends BaseProps {
  variant?: "solid" | "ghost" | "glass" | "gel" | "link";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

export function Button({
  variant = "solid",
  size = "md",
  disabled = false,
  fullWidth = false,
  children,
  className = "",
  style,
  onClick,
}: ButtonProps) {
  const dark = useDarkMode();
  const [hovered, setHovered] = useState(false);
  const sizeMap = {
    sm: { px: "14px", py: "8px", fs: "12px" },
    md: { px: "20px", py: "10px", fs: "13px" },
    lg: { px: "28px", py: "14px", fs: "15px" },
  };
  const s = sizeMap[size];

  const base: CSSProperties = {
    fontSize: s.fs,
    fontWeight: 600,
    fontFamily: "var(--font-ui)",
    padding: `${s.py} ${s.px}`,
    borderRadius: "var(--glass-radius-pill, 100px)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "all 200ms ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: fullWidth ? "100%" : undefined,
    opacity: disabled ? 0.5 : 1,
    transform: hovered && !disabled ? "scale(1.05)" : "scale(1)",
    outline: "none",
  };

  const variants: Record<string, CSSProperties> = {
    solid: {
      ...base,
      background: dark ? "#fff" : "#000",
      color: dark ? "#000" : "#fff",
      boxShadow: hovered && !disabled ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
    },
    ghost: {
      ...base,
      background: hovered && !disabled
        ? dark
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.04)"
        : "transparent",
      border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
      color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
    },
    glass: {
      ...base,
      background: dark
        ? "rgba(255,255,255,0.1)"
        : "rgba(255,255,255,0.6)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.2)"}`,
      color: dark ? "#fff" : "#000",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.06)",
    },
    gel: {
      ...base,
      background: dark
        ? "rgba(255,255,255,0.12)"
        : "rgba(255,255,255,0.25)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow:
        "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)",
      color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
    },
    link: {
      ...base,
      background: "transparent",
      padding: "0",
      color: dark ? "#b0c4af" : "#354334",
      textDecoration: "underline",
      transform: "none",
      opacity: hovered && !disabled ? 0.7 : disabled ? 0.5 : 1,
    },
  };

  return (
    <button
      className={`${variant === "glass" ? "glass-1 glass-specular" : ""} ${variant === "gel" ? "gel-glass" : ""} ${className}`}
      style={{ ...variants[variant], ...style }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
