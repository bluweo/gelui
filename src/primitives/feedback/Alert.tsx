import { type ReactNode, type CSSProperties, useState } from "react";

const variantColors: Record<string, { color: string; bg: string }> = {
  info: { color: "#5AC8FA", bg: "rgba(90,200,250,0.08)" },
  success: { color: "#34C759", bg: "rgba(52,199,89,0.08)" },
  warning: { color: "#FF9500", bg: "rgba(255,149,0,0.08)" },
  error: { color: "#FF3B30", bg: "rgba(255,59,48,0.08)" },
};

interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  style?: CSSProperties;
}

function AlertIcon({ variant }: { variant: string }) {
  const size = 20;
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
        <path d="M10 6v5" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="14" r="0.75" fill="#FF3B30" />
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
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const c = variantColors[variant] ?? variantColors.info;

  return (
    <div
      className={`prim-alert ${className}`}
      style={{
        "--alert-color": c.color,
        "--alert-bg": c.bg,
        ...style,
      } as CSSProperties}
    >
      {/* Left glow edge */}
      <div className="prim-alert-glow" />

      {/* Icon container */}
      <div className="prim-alert-icon-wrap">
        <AlertIcon variant={variant} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="prim-alert-title">{title}</div>
        )}
        <div className="prim-alert-desc">{children}</div>
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button onClick={handleDismiss} className="prim-alert-dismiss">
          &times;
        </button>
      )}
    </div>
  );
}
