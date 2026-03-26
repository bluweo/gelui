import { Spinner, Progress, Skeleton, Alert, Toast } from "@/primitives/feedback";
import { useState, useEffect, useCallback } from "react";

export function FeedbackShowcaseV2() {
  const [progress, setProgress] = useState(35);
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<"info" | "success" | "warning" | "error">("success");

  // Animate progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = useCallback((variant: "info" | "success" | "warning" | "error") => {
    setToastVariant(variant);
    setShowToast(true);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* Spinners */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Spinners</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-header-bg)]">
          <span className="text-xs font-[550] text-[var(--theme-fg)]">Sizes</span>
          <div className="flex gap-4 items-center">
            <Spinner size="16px" />
            <Spinner size="24px" />
            <Spinner size="32px" />
          </div>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="text-xs font-[550] text-[var(--theme-fg)]">Progress ({progress}%)</span>
          <div className="w-[60%]">
            <Progress value={progress} />
          </div>
        </div>
      </div>

      {/* Skeleton Loaders */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Skeleton Loaders</span>
        </div>
        <div className="p-4">
          {/* Card skeleton */}
          <div className="mb-4">
            <span className="text-[11px] font-[550] text-[var(--theme-fg)] block mb-2">Card Loading</span>
            <div className="flex gap-3 items-start">
              <Skeleton width="48px" height="48px" rounded="50%" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton width="60%" height="14px" />
                <Skeleton width="100%" height="10px" />
                <Skeleton width="80%" height="10px" />
              </div>
            </div>
          </div>
          {/* List skeleton */}
          <div>
            <span className="text-[11px] font-[550] text-[var(--theme-fg)] block mb-2">List Loading</span>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2.5 items-center mb-2">
                <Skeleton width="32px" height="32px" rounded="8px" />
                <div className="flex-1 flex flex-col gap-1">
                  <Skeleton width={`${70 - i * 10}%`} height="12px" />
                  <Skeleton width={`${50 - i * 5}%`} height="9px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Alerts</span>
        </div>
        <div className="py-3 px-4 flex flex-col gap-2.5">
          <Alert variant="info" title="Information">This is an informational message.</Alert>
          <Alert variant="success" title="Success">Operation completed successfully.</Alert>
          <Alert variant="warning" title="Warning" dismissible>This warning can be dismissed.</Alert>
          <Alert variant="error" title="Error" dismissible>Something went wrong. Try again.</Alert>
        </div>
      </div>

      {/* Toast Demo */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Toast Notifications</span>
        </div>
        <div className="flex flex-wrap gap-2 py-3.5 px-4">
          {(["info", "success", "warning", "error"] as const).map((v) => (
            <button
              key={v}
              onClick={() => triggerToast(v)}
              className="text-xs font-semibold py-2 px-3.5 rounded-[var(--glass-radius-pill)] border border-[var(--theme-divider)] bg-[var(--theme-header-bg)] text-[var(--theme-fg)] cursor-pointer capitalize transition-all duration-150 ease-in-out"
            >
              {v} Toast
            </button>
          ))}
        </div>
      </div>

      {/* Toast component */}
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
