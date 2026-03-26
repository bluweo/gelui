import { Button, LinkButton } from "@/primitives/buttons";

export function ButtonsShowcase() {
  return (
    <div className="flex flex-col gap-5">
      {/* Solid Buttons */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-header-bg)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Solid</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-header-bg)]">
          <span className="type-label text-[var(--theme-fg-muted)]">Pill</span>
          <Button variant="solid" size="md">Button</Button>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-header-bg)]">
          <span className="type-label text-[var(--theme-fg-muted)]">Rounded</span>
          <Button variant="solid" size="md" style={{ borderRadius: "var(--glass-radius, 16px)" }}>Button</Button>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label text-[var(--theme-fg-muted)]">Small</span>
          <Button variant="solid" size="sm">Button</Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-header-bg)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Ghost</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-header-bg)]">
          <span className="type-label text-[var(--theme-fg-muted)]">Pill</span>
          <Button variant="ghost" size="md">Button</Button>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label text-[var(--theme-fg-muted)]">Rounded</span>
          <Button variant="ghost" size="md" style={{ borderRadius: "var(--glass-radius-sm, 10px)" }}>Button</Button>
        </div>
      </div>

      {/* Action Pair */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-header-bg)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Action Pair</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-header-bg)]">
          <span className="type-label text-[var(--theme-fg-muted)]">Medium</span>
          <div className="flex gap-2.5">
            <Button variant="ghost" size="md" shape="rounded">Cancel</Button>
            <Button variant="solid" size="md" shape="rounded">Apply</Button>
          </div>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label text-[var(--theme-fg-muted)]">Compact</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" shape="rounded">Cancel</Button>
            <Button variant="solid" size="sm" shape="rounded">Apply</Button>
          </div>
        </div>
      </div>

      {/* Link Buttons */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-header-bg)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Link</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-header-bg)]">
          <span className="type-label text-[var(--theme-fg-muted)]">Underline</span>
          <LinkButton underline>Learn more</LinkButton>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label text-[var(--theme-fg-muted)]">Arrow</span>
          <LinkButton arrow>Explore</LinkButton>
        </div>
      </div>
    </div>
  );
}
