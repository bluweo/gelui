import type { BaseProps } from "../types";

interface IconButtonProps extends BaseProps {
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  title?: string;
}

export function IconButton({
  size = "md",
  children,
  className = "",
  style,
  onClick,
  title,
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`prim-icon-btn ${className}`}
      data-size={size}
      style={style}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}
