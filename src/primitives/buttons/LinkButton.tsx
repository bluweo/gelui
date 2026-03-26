import type { BaseProps } from "../types";

interface LinkButtonProps extends BaseProps {
  href?: string;
  arrow?: boolean;
  underline?: boolean;
  onClick?: () => void;
}

export function LinkButton({
  children,
  href,
  arrow = false,
  underline = false,
  className = "",
  style,
  onClick,
}: LinkButtonProps) {
  return (
    <button
      className={`prim-link-btn ${className}`}
      onClick={onClick ?? (() => href && (window.location.href = href))}
      data-underline={underline}
      style={style}
    >
      {children}
      {arrow && (
        <span className="prim-link-btn-arrow">
          &rarr;
        </span>
      )}
    </button>
  );
}
