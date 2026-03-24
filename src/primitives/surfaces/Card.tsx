import type { BaseProps } from "../types";

interface CardProps extends BaseProps {
  variant?: "glass" | "gel" | "solid" | "transparent";
  frost?: "standard" | "haze" | "none";
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
    solid: "",
    transparent: "",
  };
  const frostClass =
    frost === "standard"
      ? "ds-card-frost"
      : frost === "haze"
        ? "ds-card-frost-haze"
        : "";

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--glass-radius,16px)] p-5 ${variantClasses[variant]} ${className}`}
      style={{
        ...(variant === "solid"
          ? { background: "rgba(255,255,255,0.95)" }
          : variant === "transparent"
            ? { border: "1px solid rgba(0,0,0,0.08)" }
            : {}),
        ...style,
      }}
    >
      {frostClass && (
        <div
          className={`absolute inset-x-0 top-0 pointer-events-none ${frostClass}`}
          style={{ height: "160px" }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
