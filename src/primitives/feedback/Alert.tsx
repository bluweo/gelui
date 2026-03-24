import { type ReactNode, type CSSProperties, useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  style?: CSSProperties;
}

const variantColors = {
  info: { border: "#5AC8FA", bg: "rgba(90,200,250,0.08)", bgDark: "rgba(90,200,250,0.12)" },
  success: { border: "#34C759", bg: "rgba(52,199,89,0.08)", bgDark: "rgba(52,199,89,0.12)" },
  warning: { border: "#FF9500", bg: "rgba(255,149,0,0.08)", bgDark: "rgba(255,149,0,0.12)" },
  error: { border: "#FF3B30", bg: "rgba(255,59,48,0.08)", bgDark: "rgba(255,59,48,0.12)" },
};

function AlertIcon({ variant }: { variant: "info" | "success" | "warning" | "error" }) {
  const size = 18;
  const icons: Record<string, ReactNode> = {
    info: (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#5AC8FA" strokeWidth="1.5" />
        <path d="M10 9v5" stroke="#5AC8FA" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="6.5" r="0.75" fill="#5AC8FA" />
      </svg>
    ),
    success: (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#34C759" strokeWidth="1.5" />
        <path d="M6.5 10.5l2.5 2.5 5-5.5" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    warning: (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M10 2l8.66 15H1.34L10 2z" stroke="#FF9500" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 8v4" stroke="#FF9500" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="14.5" r="0.75" fill="#FF9500" />
      </svg>
    ),
    error: (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#FF3B30" strokeWidth="1.5" />
        <path d="M7 7l6 6M13 7l-6 6" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };
  return <>{icons[variant]}</>;
}

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className = "",
  style,
}: AlertProps) {
  const dark = useDarkMode();
  const [dismissed, setDismissed] = useState(false);
  const colors = variantColors[variant];

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "14px 16px",
        borderRadius: "var(--glass-radius-sm, 10px)",
        borderLeft: `4px solid ${colors.border}`,
        background: dark ? colors.bgDark : colors.bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        fontFamily: "var(--font-body)",
        color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)",
        position: "relative",
        ...style,
      }}
    >
      <span style={{ flexShrink: 0, display: "flex", marginTop: "1px" }}>
        <AlertIcon variant={variant} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "var(--font-ui)",
              marginBottom: "4px",
              color: dark ? "#fff" : "#000",
            }}
          >
            {title}
          </div>
        )}
        <div style={{ fontSize: "13px", lineHeight: 1.5 }}>{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          style={{
            flexShrink: 0,
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: "none",
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
            color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 400,
            transition: "background 150ms ease",
            padding: 0,
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
}
