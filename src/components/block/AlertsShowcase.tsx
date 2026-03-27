import { Alert, Toast } from "@/primitives/feedback";
import { useState, useCallback } from "react";

export function AlertsShowcase() {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<"info" | "success" | "warning" | "error">("success");

  const triggerToast = useCallback((variant: "info" | "success" | "warning" | "error") => {
    setToastVariant(variant);
    setShowToast(true);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Alert cards — standalone with shadows */}
      <div className="flex flex-col gap-3">
        <Alert variant="info" title="Information">Anyone with a link can now view this file.</Alert>
        <Alert variant="success" title="Success">Anyone with a link can now view this file.</Alert>
        <Alert variant="warning" title="Warning">Anyone with a link can now view this file.</Alert>
        <Alert variant="error" title="Error">Anyone with a link can now view this file.</Alert>
      </div>

      {/* Toast Demo */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Toast</span>
        </div>
        <div className="flex flex-wrap gap-1.5 py-3 px-3.5">
          {(["info", "success", "warning", "error"] as const).map((v) => (
            <button
              key={v}
              onClick={() => triggerToast(v)}
              className="text-[11px] font-semibold py-1.5 px-3 rounded-[var(--glass-radius-pill)] border border-[var(--theme-divider)] bg-[var(--theme-header-bg)] text-[var(--theme-fg)] cursor-pointer capitalize transition-all duration-150 hover:scale-105"
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <Toast
        variant={toastVariant}
        message={`This is a ${toastVariant} toast notification.`}
        visible={showToast}
        duration={3000}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
