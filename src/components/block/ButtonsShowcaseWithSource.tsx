import { useState, useEffect } from "react";
import { ButtonsShowcase } from "./ButtonsShowcase";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

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
        <div className="py-2 px-3 border-b contrast-border">
          <span className="type-overline contrast-muted">Ghost</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label contrast-muted">Pill</span>
          <Button variant="ghost" size="md">Button</Button>
        </div>
      </div>

      {/* Action Pair */}
      <div className="rounded-[var(--glass-radius-sm)] border contrast-border">
        <div className="flex items-center justify-between py-3.5 px-4">
          <Button variant="ghost" size="md" shape="rounded">Cancel</Button>
          <Button variant="solid" size="md" shape="rounded">Apply</Button>
        </div>
      </div>

      {/* Link Buttons */}
      <div className="rounded-[var(--glass-radius-sm)] border contrast-border">
        <div className="flex items-center justify-between py-3.5 px-4">
          <LinkButton underline>Learn more</LinkButton>
          <LinkButton arrow>Explore</LinkButton>
        </div>
      </div>
    </div>
  );
}

// Right Column: Gel, Glass, States (transparent background)
import { Button } from "@/primitives/buttons";

export function ButtonsRightColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const contrast = useInheritedContrast(ref);

  return (
    <div ref={ref} data-contrast={contrast} className="flex flex-col gap-5">
      {/* Gel */}
      <div className="border contrast-border">
        <span className="type-overline contrast-muted">Gel</span>
        <Button variant="gel" size="sm">Small</Button>
        <Button variant="gel" size="md">Medium</Button>
        <Button variant="gel" size="lg">Large</Button>
        <Button variant="gel" size="sm" shape="circle">
          <HeartIcon />
        </Button>
        <Button variant="gel" size="md" shape="circle">
          <SearchIcon />
        </Button>
      </div>

      {/* Glass */}
      <div className="border contrast-border">
        <span className="type-overline contrast-muted">Glass</span>
        <Button variant="glass" size="md" shape="pill">Glass Pill</Button>
        <Button variant="glass" size="md" shape="rounded">Glass Rounded</Button>
      </div>

      {/* States */}
      <div className="border contrast-border">
        <span className="type-overline contrast-muted">States</span>
        <Button variant="gel" size="md">Default</Button>
        <Button variant="gel" size="md" disabled>Disabled</Button>
      </div>
    </div>
  );
}`;

const IMPL_BUTTON = `import type { CSSProperties } from "react";
import type { BaseProps } from "../types";

interface ButtonProps extends BaseProps {
  variant?: "solid" | "ghost" | "glass" | "gel" | "link";
  size?: "sm" | "md" | "lg";
  shape?: "pill" | "rounded" | "circle";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

/* Static class maps — Tailwind v4 can't scan template literals */
const SIZE_CLASSES: Record<string, string> = {
  sm: "prim-btn-sm",
  md: "prim-btn-md",
  lg: "prim-btn-lg",
};
const SHAPE_CLASSES: Record<string, string> = {
  pill: "prim-btn-pill",
  rounded: "prim-btn-rounded",
  circle: "prim-btn-circle",
};
const VARIANT_CLASSES: Record<string, string> = {
  solid: "prim-btn-solid",
  ghost: "prim-btn-ghost",
  glass: "prim-btn-glass",
  link: "prim-btn-link",
  gel: "gel-btn",
};

export function Button({
  variant = "solid",
  size = "md",
  shape = "pill",
  disabled = false,
  fullWidth = false,
  children,
  className = "",
  style,
  onClick,
}: ButtonProps) {
  const sizeClass = shape === "circle" ? "" : (SIZE_CLASSES[size] || SIZE_CLASSES.md);
  const shapeClass = SHAPE_CLASSES[shape] || SHAPE_CLASSES.pill;
  const variantClasses =
    variant === "gel"
      ? \`gel-btn \${shape === "circle" ? "gel-btn-circle-sm" : "gel-btn-pill"}\`
      : VARIANT_CLASSES[variant] || VARIANT_CLASSES.solid;
  const fullClass = fullWidth ? "prim-btn-full" : "";

  return (
    <button
      className={\`prim-btn-base \${sizeClass} \${shapeClass} \${variantClasses} \${fullClass} \${className}\`}
      style={style}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      data-disabled={disabled}
    >
      {children}
    </button>
  );
}`;

const IMPL_LINKBUTTON = `import type { BaseProps } from "../types";

interface LinkButtonProps extends BaseProps {
  href?: string;
  arrow?: boolean;
  underline?: boolean;
  onClick?: () => void;
}

export function LinkButton({
  children,
  href,
  arrow = false,
  underline = false,
  className = "",
  style,
  onClick,
}: LinkButtonProps) {
  return (
    <button
      className={\`prim-link-btn \${className}\`}
      onClick={onClick ?? (() => href && (window.location.href = href))}
      data-underline={underline}
      style={style}
    >
      {children}
      {arrow && (
        <span className="prim-link-btn-arrow">&rarr;</span>
      )}
    </button>
  );
}`;

const COMPONENTS = [
  { name: "Button", path: "@/primitives/buttons", description: "Multi-variant button: solid, ghost, glass, gel, link. Contrast-aware via --btn-* CSS vars.", implementation: IMPL_BUTTON },
  { name: "LinkButton", path: "@/primitives/buttons", description: "Button styled as a text link with optional underline or arrow", implementation: IMPL_LINKBUTTON },
  { name: "IconButton", path: "@/primitives/buttons", description: "Circle icon button with size variants" },
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
