import { type ReactNode, type CSSProperties, useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface NavItemProps {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function NavItem({
  icon,
  label,
  active = false,
  onClick,
  className = "",
  style,
}: NavItemProps) {
  const dark = useDarkMode();
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "var(--glass-radius-sm, 10px)",
        border: "none",
        width: "100%",
        textAlign: "left",
        fontSize: "14px",
        fontWeight: active ? 600 : 400,
        fontFamily: "var(--font-ui)",
        background: active
          ? dark
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.06)"
          : hovered
            ? dark
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.03)"
            : "transparent",
        color: active
          ? dark
            ? "#fff"
            : "#000"
          : dark
            ? "rgba(255,255,255,0.6)"
            : "rgba(0,0,0,0.6)",
        cursor: "pointer",
        transition: "all 150ms ease",
        outline: "none",
        ...style,
      }}
    >
      {icon && (
        <span style={{ display: "flex", flexShrink: 0, opacity: active ? 1 : 0.6 }}>
          {icon}
        </span>
      )}
      {label}
    </button>
  );
}
