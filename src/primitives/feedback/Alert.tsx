import { type ReactNode, type CSSProperties, useState } from "react";

const variantClasses: Record<string, string> = {
  info: "border-l-[#5AC8FA] bg-[color-mix(in_srgb,#5AC8FA_8%,transparent)]",
  success: "border-l-[#34C759] bg-[color-mix(in_srgb,#34C759_8%,transparent)]",
  warning: "border-l-[#FF9500] bg-[color-mix(in_srgb,#FF9500_8%,transparent)]",
  error: "border-l-[#FF3B30] bg-[color-mix(in_srgb,#FF3B30_8%,transparent)]",
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
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={`flex items-start gap-3 py-3.5 px-4 rounded-[var(--glass-radius-sm,10px)] backdrop-blur-[12px] font-[var(--font-body)] text-[var(--theme-fg)] relative border-l-4 ${variantClasses[variant]} ${className}`}
      style={style}
    >
      <span className="shrink-0 flex mt-px">
        <AlertIcon variant={variant} />
      </span>
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold text-sm font-[var(--font-ui)] mb-1 text-[var(--theme-fg)]">
            {title}
          </div>
        )}
        <div className="text-[13px] leading-normal">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="shrink-0 w-6 h-6 rounded-full border-none bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] cursor-pointer flex items-center justify-center text-sm font-normal transition-[background] duration-150 ease-in-out p-0"
        >
          &times;
        </button>
      )}
    </div>
  );
}
