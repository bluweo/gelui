import { Spinner, Progress, Skeleton } from "@/primitives/feedback";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState, useEffect } from "react";

export function FeedbackShowcase() {
  const isDark = useDarkMode();
  const [progress, setProgress] = useState(35);

  // Animate progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Spinners + Progress */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Spinners</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelColor }}>Sizes</span>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Spinner size="16px" />
            <Spinner size="24px" />
            <Spinner size="32px" />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={{ fontSize: "12px", fontWeight: 550, color: labelColor }}>Progress ({progress}%)</span>
          <div style={{ width: "60%" }}>
            <Progress value={progress} />
          </div>
        </div>
      </div>

      {/* Skeleton Loaders */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Skeleton Loaders</span>
        </div>
        <div style={{ padding: "16px" }}>
          {/* Card skeleton */}
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 550, color: labelColor, display: "block", marginBottom: "8px" }}>Card Loading</span>
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
            <span style={{ fontSize: "11px", fontWeight: 550, color: labelColor, display: "block", marginBottom: "8px" }}>List Loading</span>
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
    </div>
  );
}
