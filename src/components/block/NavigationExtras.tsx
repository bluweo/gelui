import { Pagination, Stepper } from "@/primitives/navigation";
import { useState } from "react";

export function NavigationExtras() {
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Pagination */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: "var(--theme-table-bg)", border: "1px solid var(--theme-divider)" }}>
        <div style={{ padding: "8px 12px", background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span className="type-overline" style={{ color: "var(--theme-fg-muted)" }}>Pagination</span>
        </div>
        <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <Pagination
            totalPages={10}
            currentPage={page}
            onPageChange={setPage}
          />
          <span style={{ fontSize: "11px", color: "var(--theme-fg)" }}>
            Page {page} of 10
          </span>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: "var(--theme-table-bg)", border: "1px solid var(--theme-divider)" }}>
        <div style={{ padding: "8px 12px", background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span className="type-overline" style={{ color: "var(--theme-fg-muted)" }}>Stepper</span>
        </div>
        <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <Stepper
            steps={["Account", "Profile", "Settings", "Review"]}
            currentStep={step}
            onChange={setStep}
          />
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step <= 0}
              style={{
                padding: "6px 16px",
                borderRadius: "var(--glass-radius-pill, 100px)",
                border: "1px solid var(--theme-divider)",
                background: "transparent",
                color: "var(--theme-fg)",
                fontSize: "12px",
                fontWeight: 550,
                fontFamily: "var(--font-ui)",
                cursor: step <= 0 ? "not-allowed" : "pointer",
                opacity: step <= 0 ? 0.4 : 1,
              }}
            >
              Back
            </button>
            <button
              onClick={() => setStep(Math.min(3, step + 1))}
              disabled={step >= 3}
              style={{
                padding: "6px 16px",
                borderRadius: "var(--glass-radius-pill, 100px)",
                border: "none",
                background: "var(--theme-bg-solid)",
                color: "var(--theme-fg-on-solid)",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--font-ui)",
                cursor: step >= 3 ? "not-allowed" : "pointer",
                opacity: step >= 3 ? 0.6 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* BackToTop note */}
      <div style={{
        borderRadius: "var(--glass-radius-sm, 10px)",
        overflow: "hidden",
        background: "var(--theme-table-bg)",
        border: "1px solid var(--theme-divider)",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#007AFF", flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="8" />
          <polyline points="8 12 12 8 16 12" />
        </svg>
        <span style={{ fontSize: "12px", color: "var(--theme-fg)", lineHeight: 1.5 }}>
          <strong style={{ fontWeight: 600 }}>BackToTop</strong> is a floating button primitive that appears on scroll. It is available via <code style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "1px 4px", borderRadius: "3px", background: "var(--theme-divider)" }}>@/primitives/navigation</code> and can be placed at the page level.
        </span>
      </div>
    </div>
  );
}
