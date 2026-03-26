import { type CSSProperties, useEffect, useState } from "react";

interface ToastProps {
  variant?: "info" | "success" | "warning" | "error";
  message: string;
  visible?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

const variantColors = {
  info: { accent: "#5AC8FA", bg: "rgba(90,200,250,0.1)" },
  success: { accent: "#34C759", bg: "rgba(52,199,89,0.1)" },
  warning: { accent: "#FF9500", bg: "rgba(255,149,0,0.1)" },
  error: { accent: "#FF3B30", bg: "rgba(255,59,48,0.1)" },
};

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
  const colors = variantColors[variant];

  useEffect(() => {
    if (visible) {
      // Small delay to trigger slide-in animation
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
      // Wait for slide-out before calling onClose
      setTimeout(() => onClose?.(), 250);
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={className}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 18px",
        borderRadius: "var(--glass-radius-sm, 10px)",
        background: "var(--theme-table-bg)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1px solid var(--theme-ghost-border)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        fontFamily: "var(--font-body)",
        fontSize: "13px",
        color: "var(--theme-fg)",
        transform: show ? "translateX(0)" : "translateX(calc(100% + 32px))",
        opacity: show ? 1 : 0,
        transition: "transform 250ms ease, opacity 250ms ease",
        maxWidth: "380px",
        pointerEvents: "auto",
        ...style,
      }}
    >
      {/* Variant accent dot */}
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: colors.accent,
          flexShrink: 0,
        }}
      />
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={() => {
          setShow(false);
          setTimeout(() => onClose?.(), 250);
        }}
        style={{
          flexShrink: 0,
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "none",
          background: "var(--theme-header-bg)",
          color: "var(--theme-fg-muted)",
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
    </div>
  );
}
