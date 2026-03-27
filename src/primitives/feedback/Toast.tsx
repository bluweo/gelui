import { type CSSProperties, type ReactNode, useEffect, useState } from "react";

interface ToastProps {
  variant?: "info" | "success" | "warning" | "error";
  message: string;
  visible?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

const variantColors: Record<string, { color: string; bg: string }> = {
  info: { color: "#5AC8FA", bg: "rgba(90,200,250,0.1)" },
  success: { color: "#34C759", bg: "rgba(52,199,89,0.1)" },
  warning: { color: "#FF9500", bg: "rgba(255,149,0,0.1)" },
  error: { color: "#FF3B30", bg: "rgba(255,59,48,0.1)" },
};

function ToastIcon({ variant }: { variant: string }) {
  const s = 16;
  const icons: Record<string, ReactNode> = {
    info: (
      <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#5AC8FA" strokeWidth="1.5" />
        <path d="M10 9v5" stroke="#5AC8FA" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="6.5" r="0.75" fill="#5AC8FA" />
      </svg>
    ),
    success: (
      <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#34C759" strokeWidth="1.5" />
        <path d="M6.5 10.5l2.5 2.5 5-5.5" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    warning: (
      <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
        <path d="M10 2l8.66 15H1.34L10 2z" stroke="#FF9500" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 8v4" stroke="#FF9500" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="14.5" r="0.75" fill="#FF9500" />
      </svg>
    ),
    error: (
      <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#FF3B30" strokeWidth="1.5" />
        <path d="M10 6v5" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="14" r="0.75" fill="#FF3B30" />
      </svg>
    ),
  };
  return <>{icons[variant]}</>;
}

export function Toast({
  variant = "info",
  message,
  visible = true,
  duration = 3000,
  onClose,
  className = "",
  style,
}: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      const raf = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setShow(false);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || duration <= 0) return;
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const c = variantColors[variant] ?? variantColors.info;

  return (
    <div
      className={`prim-toast ${show ? "prim-toast-visible" : "prim-toast-hidden"} ${className}`}
      style={{ "--toast-color": c.color, "--toast-bg": c.bg, ...style } as CSSProperties}
    >
      {/* Left gradient + bar */}
      <div className="prim-toast-glow" />
      <div className="prim-toast-glow-bar" />

      {/* Icon */}
      <div className="prim-toast-icon">
        <ToastIcon variant={variant} />
      </div>

      {/* Message */}
      <span className="prim-toast-msg">{message}</span>

      {/* Close */}
      <button
        onClick={() => {
          setShow(false);
          setTimeout(() => onClose?.(), 300);
        }}
        className="prim-alert-dismiss"
      >
        &times;
      </button>
    </div>
  );
}
