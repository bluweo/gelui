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
    <div className="grid grid-cols-2 gap-5">
      {/* Left: Shadow Depths — transparent background */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border border-[var(--theme-divider)] bg-transparent">
        <div className="py-2.5 px-4 border-b border-[var(--theme-divider)] bg-transparent">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Shadow Depths</span>
        </div>
        <div className="p-4 flex flex-col gap-6">
          {elevations.map((e) => (
            <Card
              key={e.name}
              variant="solid"
              frost="none"
              className="flex items-center justify-between transition-shadow duration-300 ease-in-out"
              style={{ boxShadow: e.shadow }}
            >
              <div>
                <span className="text-base font-bold text-[var(--theme-fg)] block">{e.name}</span>
                <span className="text-[13px] text-[var(--theme-fg-muted)]">{e.desc}</span>
              </div>
              <span className="text-xs font-mono font-medium text-[var(--theme-fg-subtle)]">z-{e.z}</span>
            </Card>
          ))}
        </div>
      </div>

      {/* Right: Skeleton Loader */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-4 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg)]">Skeleton Loader</span>
        </div>
        <div className="p-5 flex flex-col gap-5">
          {/* Card skeleton */}
          <div>
            <span className="text-[10px] font-medium text-[var(--theme-fg-muted)] block mb-3">Card Loading</span>
            <div className="flex flex-col gap-3 p-4 rounded-[var(--glass-radius-sm)] bg-[var(--theme-header-bg)] border border-[var(--theme-header-bg)]">
              <div className="flex items-center gap-3">
                <Skeleton width="40px" height="40px" rounded="50%" />
                <div className="flex-1 flex flex-col gap-1.5">
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
            <span className="text-[10px] font-medium text-[var(--theme-fg-muted)] block mb-3">List Loading</span>
            <div className="flex flex-col gap-3">
              {[80, 65, 90, 55].map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton width="32px" height="32px" rounded="6px" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    <Skeleton width={`${w}%`} height="10px" />
                    <Skeleton width={`${w - 20}%`} height="8px" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media skeleton */}
          <div>
            <span className="text-[10px] font-medium text-[var(--theme-fg-muted)] block mb-3">Media Loading</span>
            <div className="grid grid-cols-3 gap-2">
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
