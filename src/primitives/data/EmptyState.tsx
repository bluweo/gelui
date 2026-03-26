import { type ReactNode, type CSSProperties } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
  style,
}: EmptyStateProps) {
  return (
    <div className={`prim-empty ${className}`} style={style}>
      {icon && <span className="prim-empty-icon">{icon}</span>}
      {title && <div className="prim-empty-title">{title}</div>}
      {description && <div className="prim-empty-desc">{description}</div>}
      {action && <div className="prim-empty-action">{action}</div>}
    </div>
  );
}
