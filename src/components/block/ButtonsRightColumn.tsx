import { useRef } from "react";
import { Button } from "@/primitives/buttons";
import { useContrastColor } from "@/components/hooks/useContrastColor";

export function ButtonsRightColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const contrast = useContrastColor(ref);

  return (
    <div ref={ref} data-contrast={contrast} className="gel-btn-force-contrast" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Gel Buttons table */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="px-3 py-2 border-b contrast-border">
          <span className="type-overline contrast-muted">Gel</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Sizes</span>
          <div className="flex items-center gap-2.5 flex-wrap justify-end">
            <Button variant="gel" size="sm" shape="pill">Small</Button>
            <Button variant="gel" size="md" shape="pill">Medium</Button>
            <Button variant="gel" size="lg" shape="pill">Large</Button>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="type-label contrast-muted">Icons</span>
          <div className="flex items-center gap-2.5">
            <Button variant="gel" size="sm" shape="circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </Button>
            <Button variant="gel" size="md" shape="circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"><path d="M4 12h16M12 4v16" /></svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Glass Buttons table */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="px-3 py-2 border-b contrast-border">
          <span className="type-overline contrast-muted">Glass</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Pill</span>
          <Button variant="glass" size="md" shape="pill">Glass Pill</Button>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="type-label contrast-muted">Rounded</span>
          <Button variant="glass" size="md" shape="rounded">Glass Rounded</Button>
        </div>
      </div>

      {/* States table */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="px-3 py-2 border-b contrast-border">
          <span className="type-overline contrast-muted">States</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Default</span>
          <Button variant="gel" size="md" shape="pill">Default</Button>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Hover</span>
          <Button variant="gel" size="md" shape="pill" style={{ transform: "scale(1.05)" }}>Hover</Button>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="type-label contrast-muted">Disabled</span>
          <Button variant="gel" size="md" shape="pill" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}
