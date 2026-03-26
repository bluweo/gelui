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
  return (
    <button
      className={`prim-icon-btn ${className}`}
      data-size={size}
      style={style}
      onClick={onClick}
    >
      {children || icon}
    </button>
  );
}
