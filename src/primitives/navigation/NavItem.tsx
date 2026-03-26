import { type ReactNode, type CSSProperties } from "react";

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
  return (
    <button
      className={`prim-nav-item ${className}`}
      onClick={onClick}
      data-active={active}
      style={style}
    >
      {icon && <span className="prim-nav-icon">{icon}</span>}
      {label}
    </button>
  );
}
