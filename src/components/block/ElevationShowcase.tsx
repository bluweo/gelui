import { Card } from "@/primitives/surfaces";
import { Skeleton } from "@/primitives/feedback";

const elevations = [
  { name: "Flat", shadow: "none", z: "0", desc: "No elevation" },
  { name: "Raised", shadow: "0 2px 8px rgba(0,0,0,0.06)", z: "100", desc: "Dropdowns" },
  { name: "Floating", shadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)", z: "300", desc: "Popovers" },
  { name: "Modal", shadow: "0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.06)", z: "400", desc: "Dialogs" },
  { name: "Top", shadow: "0 32px 100px rgba(0,0,0,0.18), 0 12px 40px rgba(0,0,0,0.08)", z: "600", desc: "Tooltips" },
];

export function ElevationShowcase() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
      {/* Left: Shadow Depths — transparent background */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", border: "1px solid var(--theme-divider)", background: "transparent" }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--theme-divider)", background: "transparent" }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--theme-fg-muted)" }}>Shadow Depths</span>
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
                transition: "box-shadow 300ms ease",
              }}
            >
              <div>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--theme-fg)", display: "block" }}>{e.name}</span>
                <span style={{ fontSize: "13px", color: "var(--theme-fg-muted)" }}>{e.desc}</span>
              </div>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", fontWeight: 500, color: "var(--theme-fg-subtle)" }}>z-{e.z}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Right: Skeleton Loader */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: "var(--theme-table-bg)", border: "1px solid var(--theme-divider)" }}>
        <div style={{ padding: "10px 16px", background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--theme-fg)" }}>Skeleton Loader</span>
        </div>
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Card skeleton */}
          <div>
            <span style={{ fontSize: "10px", fontWeight: 500, color: "var(--theme-fg-muted)", display: "block", marginBottom: "12px" }}>Card Loading</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px", borderRadius: "var(--glass-radius-sm, 10px)", background: "var(--theme-header-bg)", border: "1px solid var(--theme-header-bg)" }}>
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
            <span style={{ fontSize: "10px", fontWeight: 500, color: "var(--theme-fg-muted)", display: "block", marginBottom: "12px" }}>List Loading</span>
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
            <span style={{ fontSize: "10px", fontWeight: 500, color: "var(--theme-fg-muted)", display: "block", marginBottom: "12px" }}>Media Loading</span>
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
