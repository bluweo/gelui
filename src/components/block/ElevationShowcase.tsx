import { Card } from "@/primitives/surfaces";
import { Skeleton } from "@/primitives/feedback";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

const elevations = [
  { name: "Flat", shadow: "none", z: "0", desc: "No elevation" },
  { name: "Raised", shadow: "0 2px 8px rgba(0,0,0,0.06)", z: "100", desc: "Dropdowns" },
  { name: "Floating", shadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)", z: "300", desc: "Popovers" },
  { name: "Modal", shadow: "0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.06)", z: "400", desc: "Dialogs" },
  { name: "Top", shadow: "0 32px 100px rgba(0,0,0,0.18), 0 12px 40px rgba(0,0,0,0.08)", z: "600", desc: "Tooltips" },
];

export function ElevationShowcase() {
  const isDark = useDarkMode();

  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const headerColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";

  const headerStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 650,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: headerColor,
  };

  return (
    <div suppressHydrationWarning style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
      {/* Left: Shadow Depths — transparent background */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", border: `1px solid ${borderColor}`, background: "transparent" }}>
        <div style={{ padding: "10px 16px", borderBottom: `1px solid ${borderColor}`, background: "transparent" }}>
          <span style={{ ...headerStyle, color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}>Shadow Depths</span>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {elevations.map((e) => (
            <Card
              key={e.name}
              variant="solid"
              frost="none"
              style={{
                boxShadow: e.shadow,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: isDark ? "#222" : "#fff",
                transition: "box-shadow 300ms ease",
              }}
            >
              <div>
                <span style={{ fontSize: "16px", fontWeight: 700, color: isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.85)", display: "block" }}>{e.name}</span>
                <span style={{ fontSize: "13px", color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.55)" }}>{e.desc}</span>
              </div>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}>z-{e.z}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Right: Skeleton Loader */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "10px 16px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ ...headerStyle, color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}>Skeleton Loader</span>
        </div>
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Card skeleton */}
          <div>
            <span style={{ fontSize: "10px", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)", display: "block", marginBottom: "12px" }}>Card Loading</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px", borderRadius: "var(--glass-radius-sm, 10px)", background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Skeleton width="40px" height="40px" rounded="50%" />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Skeleton width="40%" height="12px" />
                  <Skeleton width="60%" height="10px" />
                </div>
              </div>
              <Skeleton width="100%" height="10px" />
              <Skeleton width="85%" height="10px" />
              <Skeleton width="70%" height="10px" />
            </div>
          </div>

          {/* List skeleton */}
          <div>
            <span style={{ fontSize: "10px", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)", display: "block", marginBottom: "12px" }}>List Loading</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[80, 65, 90, 55].map((w, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Skeleton width="32px" height="32px" rounded="6px" />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <Skeleton width={`${w}%`} height="10px" />
                    <Skeleton width={`${w - 20}%`} height="8px" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media skeleton */}
          <div>
            <span style={{ fontSize: "10px", fontWeight: 500, color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)", display: "block", marginBottom: "12px" }}>Media Loading</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              <Skeleton width="100%" height="0" style={{ paddingBottom: "100%", borderRadius: "var(--glass-radius-sm, 10px)" }} />
              <Skeleton width="100%" height="0" style={{ paddingBottom: "100%", borderRadius: "var(--glass-radius-sm, 10px)" }} />
              <Skeleton width="100%" height="0" style={{ paddingBottom: "100%", borderRadius: "var(--glass-radius-sm, 10px)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
