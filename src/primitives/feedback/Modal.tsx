import { type ReactNode, type CSSProperties, useEffect } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
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
  const dark = useDarkMode();

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

  const widths = { sm: "380px", md: "520px", lg: "700px" };

  return (
    <>
      <Overlay open={open} onClick={onClose} blur />
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
            maxWidth: widths[size],
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "var(--glass-radius, 16px)",
            background: dark
              ? "rgba(30,30,30,0.92)"
              : "rgba(255,255,255,0.92)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)"}`,
            boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
            animation: "modalIn 200ms ease",
            overflow: "hidden",
            ...style,
          }}
        >
          {/* Header */}
          {title && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 650,
                  fontFamily: "var(--font-heading)",
                  color: dark ? "#fff" : "#000",
                }}
              >
                {title}
              </span>
              <button
                onClick={onClose}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "none",
                  background: dark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.05)",
                  color: dark ? "#fff" : "#000",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: 400,
                  transition: "background 150ms ease",
                }}
              >
                &times;
              </button>
            </div>
          )}
          {/* Body */}
          <div
            style={{
              padding: "20px",
              overflowY: "auto",
              flex: 1,
              color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
            }}
          >
            {children}
          </div>
          {/* Footer */}
          {footer && (
            <div
              style={{
                padding: "12px 20px",
                borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
