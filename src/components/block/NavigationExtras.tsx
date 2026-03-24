import { Pagination, Stepper } from "@/primitives/navigation";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function NavigationExtras() {
  const isDark = useDarkMode();
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(1);

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Pagination */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Pagination</span>
        </div>
        <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <Pagination
            totalPages={10}
            currentPage={page}
            onPageChange={setPage}
          />
          <span style={{ fontSize: "11px", color: labelColor }}>
            Page {page} of 10
          </span>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Stepper</span>
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
                border: `1px solid ${borderColor}`,
                background: "transparent",
                color: labelColor,
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
                background: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
                color: isDark ? "#000" : "#fff",
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
        background: tableBg,
        border: `1px solid ${borderColor}`,
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
        <span style={{ fontSize: "12px", color: labelColor, lineHeight: 1.5 }}>
          <strong style={{ fontWeight: 600 }}>BackToTop</strong> is a floating button primitive that appears on scroll. It is available via <code style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "1px 4px", borderRadius: "3px", background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" }}>@/primitives/navigation</code> and can be placed at the page level.
        </span>
      </div>
    </div>
  );
}
