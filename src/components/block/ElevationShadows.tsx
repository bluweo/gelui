import { Card } from "@/primitives/surfaces";

const elevations = [
  { name: "Flat", shadow: "none", z: "0", desc: "No elevation" },
  { name: "Raised", shadow: "0 2px 8px rgba(0,0,0,0.06)", z: "100", desc: "Dropdowns" },
  { name: "Floating", shadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.04)", z: "300", desc: "Popovers" },
  { name: "Modal", shadow: "0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.06)", z: "400", desc: "Dialogs" },
  { name: "Top", shadow: "0 32px 100px rgba(0,0,0,0.18), 0 12px 40px rgba(0,0,0,0.08)", z: "600", desc: "Tooltips" },
];

export function ElevationShadows() {
  return (
    <div className="flex flex-col gap-4">
      {elevations.map((e) => (
        <Card
          key={e.name}
          variant="solid"
          frost="none"
          className="transition-shadow duration-300 ease-in-out"
          style={{ boxShadow: e.shadow }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[13px] font-bold text-[var(--theme-fg)] block">{e.name}</span>
              <span className="text-[11px] text-[var(--theme-fg-muted)]">{e.desc}</span>
            </div>
            <span className="text-[10px] font-mono font-medium text-[var(--theme-fg-subtle)]">z-{e.z}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
