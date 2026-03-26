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

const variantAccentColors: Record<string, string> = {
  info: "bg-[#5AC8FA]",
  success: "bg-[#34C759]",
  warning: "bg-[#FF9500]",
  error: "bg-[#FF3B30]",
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
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 py-3.5 px-[18px] rounded-[var(--glass-radius-sm,10px)] bg-[var(--theme-table-bg)] backdrop-blur-[40px] border border-[var(--theme-ghost-border)] shadow-[0_8px_32px_rgba(0,0,0,0.18)] font-[var(--font-body)] text-[13px] text-[var(--theme-fg)] max-w-sm pointer-events-auto transition-all duration-250 ease-in-out ${show ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+32px)] opacity-0"} ${className}`}
      style={style}
    >
      {/* Variant accent dot */}
      <span className={`w-2 h-2 rounded-full shrink-0 ${variantAccentColors[variant]}`} />
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setShow(false);
          setTimeout(() => onClose?.(), 250);
        }}
        className="shrink-0 w-6 h-6 rounded-full border-none bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] cursor-pointer flex items-center justify-center text-sm font-normal transition-[background] duration-150 ease-in-out p-0"
      >
        &times;
      </button>
    </div>
  );
}
