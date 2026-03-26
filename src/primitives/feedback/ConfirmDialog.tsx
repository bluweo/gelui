import { type CSSProperties, useEffect } from "react";
import { Overlay } from "./Overlay";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
  style?: CSSProperties;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  className = "",
  style,
}: ConfirmDialogProps) {

  // Body scroll lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  const isDanger = variant === "danger";

  return (
    <>
      <Overlay open={open} onClick={onCancel} blur />
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 pointer-events-none">
        <div
          className={[
            "glass-1 pointer-events-auto w-full max-w-[420px]",
            "rounded-[var(--glass-radius,16px)]",
            "bg-[var(--theme-table-bg)] backdrop-blur-[40px]",
            "border border-[var(--theme-ghost-border)]",
            "shadow-[0_24px_80px_rgba(0,0,0,0.18)]",
            "animate-[modalIn_200ms_ease] overflow-hidden",
            className,
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
          style={style}
        >
          {/* Title */}
          <div className="pt-5 px-5 pb-0 text-base font-[650] font-[family-name:var(--font-ui)] text-[var(--theme-fg)]">
            {title}
          </div>
          {/* Message */}
          <div className="pt-3 px-5 pb-5 text-sm font-[family-name:var(--font-body)] text-[var(--theme-fg-muted)] leading-relaxed">
            {message}
          </div>
          {/* Actions */}
          <div className="pt-3 px-5 pb-4 flex justify-end gap-2 border-t border-[var(--theme-divider)]">
            <button
              onClick={onCancel}
              className="py-2.5 px-5 text-[13px] font-semibold font-[family-name:var(--font-ui)] rounded-[var(--glass-radius-pill,100px)] border-none cursor-pointer transition-all duration-200 outline-none bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)]"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={[
                "py-2.5 px-5 text-[13px] font-semibold font-[family-name:var(--font-ui)]",
                "rounded-[var(--glass-radius-pill,100px)] border-none cursor-pointer",
                "transition-all duration-200 outline-none",
                isDanger
                  ? "bg-[#FF3B30] text-white"
                  : "bg-[var(--theme-bg-solid)] text-[var(--theme-fg-on-solid)]",
              ].join(" ")}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
