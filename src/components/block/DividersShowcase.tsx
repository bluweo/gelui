import { Divider } from "@/primitives/surfaces";
import { Overline } from "@/primitives/typography";

export function DividersShowcase() {
  return (
    <div className="flex flex-col gap-4">
      {/* Horizontal */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="px-3 py-2 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <Overline size="md" muted>Horizontal</Overline>
        </div>
        <div className="flex flex-col gap-5 p-4">
          <div>
            <span className="text-[10px] font-[500] text-[var(--theme-fg-muted)] mb-2 block">Default</span>
            <Divider />
          </div>
          <div>
            <span className="text-[10px] font-[500] text-[var(--theme-fg-muted)] mb-2 block">Bold</span>
            <Divider variant="bold" />
          </div>
          <div>
            <span className="text-[10px] font-[500] text-[var(--theme-fg-muted)] mb-2 block">Dashed</span>
            <Divider variant="dashed" />
          </div>
          <div>
            <span className="text-[10px] font-[500] text-[var(--theme-fg-muted)] mb-2 block">Gradient</span>
            <Divider variant="gradient" />
          </div>
          <div>
            <span className="text-[10px] font-[500] text-[var(--theme-fg-muted)] mb-2 block">With label</span>
            <Divider label="or" />
          </div>
          <div>
            <span className="text-[10px] font-[500] text-[var(--theme-fg-muted)] mb-2 block">With icon</span>
            <Divider icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /></svg>
            } />
          </div>
          <div>
            <span className="text-[10px] font-[500] text-[var(--theme-fg-muted)] mb-2 block">Section break</span>
            <Divider variant="dots" />
          </div>
        </div>
      </div>

      {/* Vertical & Spacing */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="px-3 py-2 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <Overline size="md" muted>Vertical & Spacing</Overline>
        </div>
        <div className="flex flex-col gap-5 p-4">
          <div>
            <span className="text-[10px] font-[500] text-[var(--theme-fg-muted)] mb-2 block">Vertical divider</span>
            <div className="flex items-center gap-4 h-[40px]">
              <span className="text-[11px] text-[var(--theme-fg-muted)]">Left</span>
              <Divider direction="vertical" />
              <span className="text-[11px] text-[var(--theme-fg-muted)]">Right</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-[500] text-[var(--theme-fg-muted)] mb-2 block">Inset divider</span>
            <div className="px-4">
              <Divider />
            </div>
          </div>
        </div>
      </div>

      {/* Glass Dividers */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border" style={{ background: "transparent" }}>
        <div className="px-3 py-2 border-b contrast-border">
          <Overline size="md" muted>Glass</Overline>
        </div>
        <div className="flex flex-col gap-5 p-4">
          <div>
            <span className="text-[10px] font-[500] contrast-muted mb-2 block">Etched line</span>
            <Divider variant="etched" />
          </div>
          <div>
            <span className="text-[10px] font-[500] contrast-muted mb-2 block">Groove</span>
            <Divider variant="groove" />
          </div>
          <div>
            <span className="text-[10px] font-[500] contrast-muted mb-2 block">Ridge</span>
            <Divider variant="ridge" />
          </div>
          <div>
            <span className="text-[10px] font-[500] contrast-muted mb-2 block">Frosted slit</span>
            <Divider variant="frostedSlit" />
          </div>
          <div>
            <span className="text-[10px] font-[500] contrast-muted mb-2 block">Vertical glass</span>
            <div className="flex items-center gap-4 h-[40px]">
              <span className="text-[11px] contrast-muted">Left</span>
              <Divider direction="vertical" />
              <span className="text-[11px] contrast-muted">Right</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
