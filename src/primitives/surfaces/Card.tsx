import type { BaseProps } from "../types";

interface CardProps extends BaseProps {
  variant?: "glass" | "gel" | "gel-floating" | "gel-inset" | "solid" | "transparent";
  frost?: "standard" | "haze" | "directional" | "none";
}

export function Card({
  variant = "glass",
  frost = "standard",
  children,
  className = "",
  style,
}: CardProps) {
  const variantClasses: Record<string, string> = {
    glass: "glass-1 glass-specular",
    gel: "gel-glass glass-specular",
    "gel-floating": "gel-glass glass-specular gel-card-floating",
    "gel-inset": "gel-card-inset",
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
          ? { background: "var(--theme-table-bg)", border: "1px solid var(--theme-divider)" }
          : variant === "transparent"
            ? { border: "1px solid var(--theme-divider)" }
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
