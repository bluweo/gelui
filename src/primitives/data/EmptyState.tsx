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
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
        gap: "12px",
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      {icon && (
        <span
          style={{
            display: "flex",
            color: "var(--theme-fg-faint)",
            marginBottom: "4px",
            fontSize: "40px",
          }}
        >
          {icon}
        </span>
      )}
      {title && (
        <div
          style={{
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "var(--font-ui)",
            color: "var(--theme-fg-muted)",
          }}
        >
          {title}
        </div>
      )}
      {description && (
        <div
          style={{
            fontSize: "13px",
            color: "var(--theme-fg-subtle)",
            maxWidth: "320px",
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      )}
      {action && <div style={{ marginTop: "8px" }}>{action}</div>}
    </div>
  );
}
