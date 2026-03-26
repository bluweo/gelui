import { Button, LinkButton } from "@/primitives/buttons";

export function ButtonsShowcase() {
  const tableBg = "var(--theme-header-bg)";

  return (
    <div className="flex flex-col gap-5">
      {/* Solid Buttons */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span className="type-overline" style={{ color: "var(--theme-fg-muted)" }}>Solid</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, borderBottom: "1px solid var(--theme-header-bg)" }}>
          <span className="type-label" style={{ color: "var(--theme-fg-muted)" }}>Pill</span>
          <Button variant="solid" size="md">Button</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, borderBottom: "1px solid var(--theme-header-bg)" }}>
          <span className="type-label" style={{ color: "var(--theme-fg-muted)" }}>Rounded</span>
          <Button variant="solid" size="md" style={{ borderRadius: "var(--glass-radius, 16px)" }}>Button</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
          <span className="type-label" style={{ color: "var(--theme-fg-muted)" }}>Small</span>
          <Button variant="solid" size="sm">Button</Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span className="type-overline" style={{ color: "var(--theme-fg-muted)" }}>Ghost</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, borderBottom: "1px solid var(--theme-header-bg)" }}>
          <span className="type-label" style={{ color: "var(--theme-fg-muted)" }}>Pill</span>
          <Button variant="ghost" size="md">Button</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
          <span className="type-label" style={{ color: "var(--theme-fg-muted)" }}>Rounded</span>
          <Button variant="ghost" size="md" style={{ borderRadius: "var(--glass-radius-sm, 10px)" }}>Button</Button>
        </div>
      </div>

      {/* Action Pair */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span className="type-overline" style={{ color: "var(--theme-fg-muted)" }}>Action Pair</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, borderBottom: "1px solid var(--theme-header-bg)" }}>
          <span className="type-label" style={{ color: "var(--theme-fg-muted)" }}>Medium</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="ghost" size="md" shape="rounded">Cancel</Button>
            <Button variant="solid" size="md" shape="rounded">Apply</Button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
          <span className="type-label" style={{ color: "var(--theme-fg-muted)" }}>Compact</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="ghost" size="sm" shape="rounded">Cancel</Button>
            <Button variant="solid" size="sm" shape="rounded">Apply</Button>
          </div>
        </div>
      </div>

      {/* Link Buttons */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg }}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span className="type-overline" style={{ color: "var(--theme-fg-muted)" }}>Link</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16, borderBottom: "1px solid var(--theme-header-bg)" }}>
          <span className="type-label" style={{ color: "var(--theme-fg-muted)" }}>Underline</span>
          <LinkButton underline>Learn more</LinkButton>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
          <span className="type-label" style={{ color: "var(--theme-fg-muted)" }}>Arrow</span>
          <LinkButton arrow>Explore</LinkButton>
        </div>
      </div>
    </div>
  );
}
