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

  const confirmBg =
    variant === "danger"
      ? "#FF3B30"
      : "var(--theme-bg-solid)";
  const confirmColor =
    variant === "danger"
      ? "#fff"
      : "var(--theme-fg-on-solid)";

  const btnBase: CSSProperties = {
    padding: "10px 20px",
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "var(--font-ui)",
    borderRadius: "var(--glass-radius-pill, 100px)",
    border: "none",
    cursor: "pointer",
    transition: "all 200ms ease",
    outline: "none",
  };

  return (
    <>
      <Overlay open={open} onClick={onCancel} blur />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          pointerEvents: "none",
        }}
      >
        <div
          className={`glass-1 ${className}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: "420px",
            borderRadius: "var(--glass-radius, 16px)",
            background: "var(--theme-table-bg)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid var(--theme-ghost-border)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
            animation: "modalIn 200ms ease",
            overflow: "hidden",
            ...style,
          }}
        >
          {/* Title */}
          <div
            style={{
              padding: "20px 20px 0",
              fontSize: "16px",
              fontWeight: 650,
              fontFamily: "var(--font-ui)",
              color: "var(--theme-fg)",
            }}
          >
            {title}
          </div>
          {/* Message */}
          <div
            style={{
              padding: "12px 20px 20px",
              fontSize: "14px",
              fontFamily: "var(--font-body)",
              color: "var(--theme-fg-muted)",
              lineHeight: 1.5,
            }}
          >
            {message}
          </div>
          {/* Actions */}
          <div
            style={{
              padding: "12px 20px 16px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              borderTop: "1px solid var(--theme-divider)",
            }}
          >
            <button
              onClick={onCancel}
              style={{
                ...btnBase,
                background: "var(--theme-header-bg)",
                color: "var(--theme-fg-muted)",
              }}
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              style={{
                ...btnBase,
                background: confirmBg,
                color: confirmColor,
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
