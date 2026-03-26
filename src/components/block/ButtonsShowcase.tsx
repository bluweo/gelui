import { useRef } from "react";
import { Button, LinkButton } from "@/primitives/buttons";
import { useContrastColor } from "@/components/hooks/useContrastColor";

export function ButtonsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const contrast = useContrastColor(ref);

  return (
    <div ref={ref} data-contrast={contrast} className="flex flex-col gap-5">
      {/* Solid Buttons */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="py-2 px-3 border-b contrast-border">
          <span className="type-overline contrast-muted">Solid</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Pill</span>
          <Button variant="solid" size="md">Button</Button>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Rounded</span>
          <Button variant="solid" size="md" style={{ borderRadius: "var(--glass-radius, 16px)" }}>Button</Button>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label contrast-muted">Small</span>
          <Button variant="solid" size="sm">Button</Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="py-2 px-3 border-b contrast-border">
          <span className="type-overline contrast-muted">Ghost</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Pill</span>
          <Button variant="ghost" size="md">Button</Button>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label contrast-muted">Rounded</span>
          <Button variant="ghost" size="md" style={{ borderRadius: "var(--glass-radius-sm, 10px)" }}>Button</Button>
        </div>
      </div>

      {/* Action Pair */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="py-2 px-3 border-b contrast-border">
          <span className="type-overline contrast-muted">Action Pair</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Medium</span>
          <div className="flex gap-2.5">
            <Button variant="ghost" size="md" shape="rounded">Cancel</Button>
            <Button variant="solid" size="md" shape="rounded">Apply</Button>
          </div>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label contrast-muted">Compact</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" shape="rounded">Cancel</Button>
            <Button variant="solid" size="sm" shape="rounded">Apply</Button>
          </div>
        </div>
      </div>

      {/* Link Buttons */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden border contrast-border">
        <div className="py-2 px-3 border-b contrast-border">
          <span className="type-overline contrast-muted">Link</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b contrast-border-subtle">
          <span className="type-label contrast-muted">Underline</span>
          <LinkButton underline>Learn more</LinkButton>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label contrast-muted">Arrow</span>
          <LinkButton arrow>Explore</LinkButton>
        </div>
      </div>
    </div>
  );
}
