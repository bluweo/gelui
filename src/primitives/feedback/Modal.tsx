import { type ReactNode, type CSSProperties, useEffect } from "react";
import { Overlay } from "./Overlay";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-[380px]",
  md: "max-w-[520px]",
  lg: "max-w-[700px]",
};

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className = "",
  style,
}: ModalProps) {

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
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <Overlay open={open} onClick={onClose} blur />
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 pointer-events-none">
        <div
          className={`glass-1 pointer-events-auto w-full ${sizeClasses[size]} max-h-[80vh] flex flex-col rounded-[var(--glass-radius,16px)] bg-[var(--theme-table-bg)] backdrop-blur-[40px] border border-[var(--theme-ghost-border)] shadow-[0_24px_80px_rgba(0,0,0,0.18)] animate-[modalIn_200ms_ease] overflow-hidden ${className}`}
          onClick={(e) => e.stopPropagation()}
          style={style}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between py-4 px-5 border-b border-[var(--theme-divider)]">
              <span className="text-base font-[650] font-[var(--font-heading)] text-[var(--theme-fg)]">
                {title}
              </span>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full border-none bg-[var(--theme-header-bg)] text-[var(--theme-fg)] cursor-pointer flex items-center justify-center text-base font-normal transition-[background] duration-150 ease-in-out"
              >
                &times;
              </button>
            </div>
          )}
          {/* Body */}
          <div className="p-5 overflow-y-auto flex-1 text-[var(--theme-fg-muted)]">
            {children}
          </div>
          {/* Footer */}
          {footer && (
            <div className="py-3 px-5 border-t border-[var(--theme-divider)] flex justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
