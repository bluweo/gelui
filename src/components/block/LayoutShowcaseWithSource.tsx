import { useState, useEffect } from "react";
import { LayoutShowcase } from "./LayoutShowcase";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_STACK from "@/primitives/layout/Stack.tsx?raw";
import IMPL_INLINE from "@/primitives/layout/Inline.tsx?raw";
import IMPL_CENTER from "@/primitives/layout/Center.tsx?raw";
import IMPL_SPACER from "@/primitives/layout/Spacer.tsx?raw";
import IMPL_GRID from "@/primitives/layout/Grid.tsx?raw";
import IMPL_BOX from "@/primitives/layout/Box.tsx?raw";

const SOURCE_CODE = `import { Stack, Inline, Center, Spacer, Grid, Box } from "@/primitives/layout";

{/* Vertical stack with gap */}
<Stack gap="16px">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

{/* Horizontal inline with gap */}
<Inline gap="12px">
  <Button>Save</Button>
  <Button variant="ghost">Cancel</Button>
</Inline>

{/* Centered content */}
<Center className="h-[200px]">
  <Spinner />
</Center>

{/* Spacer between elements */}
<Inline gap="0px">
  <Logo />
  <Spacer />
  <NavLinks />
</Inline>

{/* Responsive grid */}
<Grid cols={3} gap="16px">
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
</Grid>`;

const COMPONENTS = [
  {
    name: "Stack", path: "@/primitives/layout",
    description: "Vertical flex container with configurable gap",
    implementation: IMPL_STACK,
    props: [
      { name: "gap", type: "string", default: '"12px"' },
      { name: "children", type: "ReactNode" },
    ],
  },
  {
    name: "Inline", path: "@/primitives/layout",
    description: "Horizontal flex container with gap, align, and justify",
    implementation: IMPL_INLINE,
    props: [
      { name: "gap", type: "string", default: '"12px"' },
      { name: "align", type: "enum", options: ["start", "center", "end", "stretch"], default: '"center"' },
      { name: "justify", type: "enum", options: ["start", "center", "end", "between", "around"] },
      { name: "wrap", type: "boolean", default: "false" },
      { name: "children", type: "ReactNode" },
    ],
  },
  {
    name: "Center", path: "@/primitives/layout",
    description: "Flexbox centering container (both axes)",
    implementation: IMPL_CENTER,
    props: [
      { name: "children", type: "ReactNode" },
    ],
  },
  {
    name: "Spacer", path: "@/primitives/layout",
    description: "Vertical spacer with configurable height, or flex spacer in Inline",
    implementation: IMPL_SPACER,
    props: [
      { name: "size", type: "string", default: '"16px"' },
    ],
  },
  {
    name: "Grid", path: "@/primitives/layout",
    description: "CSS Grid with configurable columns and gap",
    implementation: IMPL_GRID,
    props: [
      { name: "cols", type: "number", default: "2" },
      { name: "gap", type: "string", default: '"16px"' },
      { name: "children", type: "ReactNode" },
    ],
  },
  {
    name: "Box", path: "@/primitives/layout",
    description: "Simple div wrapper with className and style passthrough",
    implementation: IMPL_BOX,
    props: [
      { name: "children", type: "ReactNode" },
    ],
  },
];

export function LayoutShowcaseWithSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="layout"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <LayoutShowcase />
      <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Layout Compositions" code={SOURCE_CODE} components={COMPONENTS} />
    </>
  );
}
