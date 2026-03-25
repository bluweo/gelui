import { useState, useEffect } from "react";
import { ButtonsShowcase } from "./ButtonsShowcase";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `// Left Column: Solid, Ghost, Action Pair, Link
import { Button, LinkButton } from "@/primitives/buttons";

export function ButtonsShowcase() {
  return (
    <div className="flex flex-col gap-5">
      {/* Solid Buttons */}
      <div className="table-card">
        <div className="table-header">
          <span className="type-overline">Solid</span>
        </div>
        <div className="table-row">
          <span className="type-label">Pill</span>
          <Button variant="solid" size="md">Button</Button>
        </div>
        <div className="table-row">
          <span className="type-label">Rounded</span>
          <Button variant="solid" size="md" style={{ borderRadius: "var(--glass-radius)" }}>Button</Button>
        </div>
        <div className="table-row">
          <span className="type-label">Small</span>
          <Button variant="solid" size="sm">Button</Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div className="table-card">
        <div className="table-header">
          <span className="type-overline">Ghost</span>
        </div>
        <div className="table-row">
          <span className="type-label">Pill</span>
          <Button variant="ghost" size="md">Button</Button>
        </div>
        <div className="table-row">
          <span className="type-label">Rounded</span>
          <Button variant="ghost" size="md">Button</Button>
        </div>
      </div>

      {/* Action Pair */}
      <div className="table-card">
        <div className="table-header">
          <span className="type-overline">Action Pair</span>
        </div>
        <div className="flex items-center justify-center gap-3 p-4">
          <Button variant="ghost" size="md">Cancel</Button>
          <Button variant="solid" size="md">Apply</Button>
        </div>
      </div>

      {/* Link Buttons */}
      <div className="table-card">
        <div className="table-header">
          <span className="type-overline">Link</span>
        </div>
        <div className="table-row">
          <span className="type-label">Underline</span>
          <LinkButton underline>Learn more</LinkButton>
        </div>
        <div className="table-row">
          <span className="type-label">Arrow</span>
          <LinkButton arrow>Explore</LinkButton>
        </div>
      </div>
    </div>
  );
}

// Right Column: Gel, Glass, States (transparent background)
import { Button } from "@/primitives/buttons";
import { useContrastColor } from "@/components/hooks/useContrastColor";

export function ButtonsRightColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const contrast = useContrastColor(ref);

  return (
    <div ref={ref} data-contrast={contrast}>
      {/* Gel */}
      <div className="table-card transparent">
        <span className="type-overline contrast-muted">Gel</span>
        <Button variant="gel" size="sm">Small</Button>
        <Button variant="gel" size="md">Medium</Button>
        <Button variant="gel" size="lg">Large</Button>
        <Button variant="gel" size="md" shape="circle">+</Button>
      </div>

      {/* Glass */}
      <div className="table-card transparent">
        <span className="type-overline contrast-muted">Glass</span>
        <Button variant="glass" size="md" shape="pill">Glass Pill</Button>
        <Button variant="glass" size="md">Glass Rounded</Button>
      </div>

      {/* States */}
      <div className="table-card transparent">
        <span className="type-overline contrast-muted">States</span>
        <Button variant="gel" size="md">Default</Button>
        <Button variant="gel" size="md">Hover</Button>
        <Button variant="gel" size="md" disabled>Disabled</Button>
      </div>
    </div>
  );
}`;

const COMPONENTS = [
  { name: "Button", path: "@/primitives/buttons", description: "Multi-variant button: solid, ghost, glass, gel, link" },
  { name: "IconButton", path: "@/primitives/buttons", description: "Circle icon button" },
  { name: "LinkButton", path: "@/primitives/buttons", description: "Button styled as a text link with arrow" },
  { name: "ButtonGroup", path: "@/primitives/buttons", description: "Connected button row for toolbars" },
];

export function ButtonsShowcaseWithSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="buttons"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <ButtonsShowcase />
      <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Buttons Block" code={SOURCE_CODE} components={COMPONENTS} />
    </>
  );
}
