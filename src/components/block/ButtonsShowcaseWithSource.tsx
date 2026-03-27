import { useState, useEffect } from "react";
import { ButtonsShowcase } from "./ButtonsShowcase";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_BUTTON from "@/primitives/buttons/Button.tsx?raw";
import IMPL_LINKBUTTON from "@/primitives/buttons/LinkButton.tsx?raw";
import IMPL_ICONBUTTON from "@/primitives/buttons/IconButton.tsx?raw";
import IMPL_BUTTONGROUP from "@/primitives/buttons/ButtonGroup.tsx?raw";

const SOURCE_CODE = `// Left Column: Solid, Ghost, Action Pair, Link
// Contrast-aware — inherits data-contrast from parent/main
import { Button, LinkButton } from "@/primitives/buttons";

export function ButtonsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const contrast = useInheritedContrast(ref);

  return (
    <div ref={ref} data-contrast={contrast} className="flex flex-col gap-5">
      {/* Solid Buttons */}
      <div className="rounded-[var(--glass-radius-sm)] border contrast-border">
        <div className="py-2 px-3 border-b contrast-border">
          <span className="type-overline contrast-muted">Solid</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label contrast-muted">Pill</span>
          <Button variant="solid" size="md">Button</Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div className="rounded-[var(--glass-radius-sm)] border contrast-border">
        <div className="flex items-center justify-between py-3.5 px-4">
          <Button variant="ghost" size="md">Button</Button>
        </div>
      </div>

      {/* Action Pair */}
      <div className="flex items-center justify-between py-3.5 px-4">
        <Button variant="ghost" size="md" shape="rounded">Cancel</Button>
        <Button variant="solid" size="md" shape="rounded">Apply</Button>
      </div>

      {/* Link Buttons */}
      <LinkButton underline>Learn more</LinkButton>
      <LinkButton arrow>Explore</LinkButton>
    </div>
  );
}

// Right Column: Gel, Glass, States (transparent background)
import { Button } from "@/primitives/buttons";

export function ButtonsRightColumn() {
  return (
    <div data-contrast={contrast} className="flex flex-col gap-5">
      <Button variant="gel" size="sm">Small</Button>
      <Button variant="gel" size="md">Medium</Button>
      <Button variant="gel" size="lg">Large</Button>
      <Button variant="gel" size="sm" shape="circle"><HeartIcon /></Button>
      <Button variant="glass" size="md" shape="pill">Glass Pill</Button>
      <Button variant="glass" size="md" shape="rounded">Glass Rounded</Button>
      <Button variant="gel" size="md" disabled>Disabled</Button>

      {/* Icon Buttons — utility/tool actions */}
      <IconButton size="sm" title="Code"><CodeIcon /></IconButton>
      <IconButton size="md" title="Settings"><SettingsIcon /></IconButton>
      <IconButton size="lg" title="Search"><SearchIcon /></IconButton>
    </div>
  );
}`;

const COMPONENTS = [
  {
    name: "Button",
    path: "@/primitives/buttons",
    description: "Multi-variant button: solid, ghost, glass, gel, link. Contrast-aware via --btn-* CSS vars.",
    implementation: IMPL_BUTTON,
    props: [
      { name: "variant", type: "enum", options: ["solid", "ghost", "glass", "gel", "link"], default: '"solid"' },
      { name: "size", type: "enum", options: ["sm", "md", "lg"], default: '"md"' },
      { name: "shape", type: "enum", options: ["pill", "rounded", "circle"], default: '"pill"' },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "fullWidth", type: "boolean", default: "false" },
      { name: "onClick", type: "() => void" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "LinkButton",
    path: "@/primitives/buttons",
    description: "Button styled as a text link with optional underline or arrow",
    implementation: IMPL_LINKBUTTON,
    props: [
      { name: "href", type: "string" },
      { name: "underline", type: "boolean", default: "false" },
      { name: "arrow", type: "boolean", default: "false" },
      { name: "onClick", type: "() => void" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "IconButton",
    path: "@/primitives/buttons",
    description: "Contrast-aware circle icon button. Adapts to glass panels and dark backgrounds via --icon-btn-* CSS vars. Use for tool/utility actions (settings, close, code view).",
    implementation: IMPL_ICONBUTTON,
    props: [
      { name: "size", type: "enum", options: ["sm", "md", "lg"], default: '"md"' },
      { name: "title", type: "string" },
      { name: "onClick", type: "() => void" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "ButtonGroup",
    path: "@/primitives/buttons",
    description: "Connected button row for toolbars. Use attached mode for joined buttons.",
    implementation: IMPL_BUTTONGROUP,
    props: [
      { name: "attached", type: "boolean", default: "false" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
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
