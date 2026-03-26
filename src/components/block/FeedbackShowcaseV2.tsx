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

  const headerStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 650,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--theme-fg-muted)",
  };

  const tableStyle: React.CSSProperties = {
    borderRadius: "var(--glass-radius-sm, 10px)",
    overflow: "hidden",
    background: "var(--theme-table-bg)",
    border: "1px solid var(--theme-divider)",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 550,
    color: "var(--theme-fg)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Spinners */}
      <div style={tableStyle}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span style={headerStyle}>Spinners</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, borderBottom: "1px solid var(--theme-header-bg)" }}>
          <span style={labelStyle}>Sizes</span>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Spinner size="16px" />
            <Spinner size="24px" />
            <Spinner size="32px" />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
          <span style={labelStyle}>Progress ({progress}%)</span>
          <div style={{ width: "60%" }}>
            <Progress value={progress} />
          </div>
        </div>
      </div>

      {/* Skeleton Loaders */}
      <div style={tableStyle}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span style={headerStyle}>Skeleton Loaders</span>
        </div>
        <div style={{ padding: "16px" }}>
          {/* Card skeleton */}
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 550, color: "var(--theme-fg)", display: "block", marginBottom: "8px" }}>Card Loading</span>
            <div style={{ display: "flex", gap: "12px", alignItems: "start" }}>
              <Skeleton width="48px" height="48px" rounded="50%" />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                <Skeleton width="60%" height="14px" />
                <Skeleton width="100%" height="10px" />
                <Skeleton width="80%" height="10px" />
              </div>
            </div>
          </div>
          {/* List skeleton */}
          <div>
            <span style={{ fontSize: "11px", fontWeight: 550, color: "var(--theme-fg)", display: "block", marginBottom: "8px" }}>List Loading</span>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                <Skeleton width="32px" height="32px" rounded="8px" />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <Skeleton width={`${70 - i * 10}%`} height="12px" />
                  <Skeleton width={`${50 - i * 5}%`} height="9px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div style={tableStyle}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span style={headerStyle}>Alerts</span>
        </div>
        <div style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, display: "flex", flexDirection: "column", gap: "10px" }}>
          <Alert variant="info" title="Information">This is an informational message.</Alert>
          <Alert variant="success" title="Success">Operation completed successfully.</Alert>
          <Alert variant="warning" title="Warning" dismissible>This warning can be dismissed.</Alert>
          <Alert variant="error" title="Error" dismissible>Something went wrong. Try again.</Alert>
        </div>
      </div>

      {/* Toast Demo */}
      <div style={tableStyle}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span style={headerStyle}>Toast Notifications</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
          {(["info", "success", "warning", "error"] as const).map((v) => (
            <button
              key={v}
              onClick={() => triggerToast(v)}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                paddingTop: 8, paddingBottom: 8, paddingLeft: 14, paddingRight: 14,
                borderRadius: "var(--glass-radius-pill, 100px)",
                border: "1px solid var(--theme-divider)",
                background: "var(--theme-header-bg)",
                color: "var(--theme-fg)",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 150ms ease",
              }}
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
