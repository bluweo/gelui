import type { BaseProps } from "../types";
import { useDarkMode } from "../hooks/useDarkMode";

interface CardProps extends BaseProps {
  variant?: "glass" | "gel" | "solid" | "transparent";
  frost?: "standard" | "haze" | "directional" | "none";
}

export function Card({
  variant = "glass",
  frost = "standard",
  children,
  className = "",
  style,
}: CardProps) {
  const isDark = useDarkMode();

  const variantClasses: Record<string, string> = {
    glass: "glass-1 glass-specular",
    gel: "gel-glass glass-specular",
    solid: "",
    transparent: "",
  };
  const frostClass =
    frost === "standard"
      ? "ds-card-frost"
      : frost === "haze"
        ? "ds-card-frost-haze"
        : frost === "directional"
          ? "token-hero-frost"
          : "";

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--glass-radius,16px)] p-5 ${variantClasses[variant]} ${className}`}
      style={{
        ...(variant === "solid"
          ? { background: isDark ? "#1a1a1a" : "rgba(255,255,255,0.95)", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` }
          : variant === "transparent"
            ? { border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}` }
            : {}),
        ...style,
      }}
    >
      {frostClass && (
        <div
          className={`absolute inset-x-0 top-0 pointer-events-none ${frostClass}`}
          style={{ height: frost === "directional" ? "100%" : "160px" }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
