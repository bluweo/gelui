import { useState } from "react";
import type { BaseProps } from "../types";

interface IconButtonProps extends BaseProps {
  icon?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function IconButton({
  icon = "+",
  size = "md",
  children,
  className = "",
  style,
  onClick,
}: IconButtonProps) {
  const [hovered, setHovered] = useState(false);
  const dim = size === "sm" ? "32px" : size === "lg" ? "48px" : "40px";
  return (
    <button
      className={className}
      style={{
        width: dim,
        height: dim,
        borderRadius: "50%",
        border: "1px solid var(--theme-divider)",
        background: "var(--theme-header-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "18px",
        color: "var(--theme-fg)",
        transition: "all 200ms ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children || icon}
    </button>
  );
}
