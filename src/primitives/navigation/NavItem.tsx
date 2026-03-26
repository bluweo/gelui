import { type ReactNode, type CSSProperties, useState } from "react";

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
        paddingTop: 10, paddingBottom: 10, paddingLeft: 14, paddingRight: 14,
        borderRadius: "var(--glass-radius-sm, 10px)",
        border: "none",
        width: "100%",
        textAlign: "left",
        fontSize: "14px",
        fontWeight: active ? 600 : 400,
        fontFamily: "var(--font-ui)",
        background: active
          ? "var(--theme-header-bg)"
          : hovered
            ? "var(--theme-header-bg)"
            : "transparent",
        color: active
          ? "var(--theme-fg)"
          : "var(--theme-fg-muted)",
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
