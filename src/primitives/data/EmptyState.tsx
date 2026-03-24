import { type ReactNode, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  const dark = useDarkMode();

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "48px 24px",
        gap: "12px",
        fontFamily: "var(--font-body)",
        ...style,
      }}
    >
      {icon && (
        <span
          style={{
            display: "flex",
            color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)",
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
            color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </div>
      )}
      {description && (
        <div
          style={{
            fontSize: "13px",
            color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
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
