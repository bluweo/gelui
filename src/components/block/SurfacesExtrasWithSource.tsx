import { useState, useEffect } from "react";
import { SurfacesExtras } from "./SurfacesExtras";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_ACCORDION from "@/primitives/surfaces/Accordion.tsx?raw";
import IMPL_SCROLLAREA from "@/primitives/surfaces/ScrollArea.tsx?raw";
import IMPL_OVERLINE from "@/primitives/typography/Overline.tsx?raw";

const SOURCE_CODE = `import { Accordion, ScrollArea } from "@/primitives/surfaces";
import { Overline } from "@/primitives/typography";

export function SurfacesExtras() {
  const faqItems = [
    { title: "What are design tokens?", content: "..." },
    { title: "How do glass surfaces work?", content: "..." },
    { title: "Can I customize the primitives?", content: "..." },
  ];

  return (
    <div className="flex flex-col gap-5">
      <Accordion items={faqItems} defaultOpen={[0]} />

      <ScrollArea maxHeight={200}>
        <p className="type-body">Long scrollable content...</p>
      </ScrollArea>
    </div>
  );
}`;

const COMPONENTS = [
  {
    name: "Accordion",
    path: "@/primitives/surfaces",
    description: "Expandable/collapsible sections with CSS grid animation. SSR-safe.",
    implementation: IMPL_ACCORDION,
    props: [
      { name: "items", type: "AccordionItem[]" },
      { name: "multiple", type: "boolean", default: "false" },
      { name: "defaultOpen", type: "number[]", default: "[]" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "ScrollArea",
    path: "@/primitives/surfaces",
    description: "Constrained scrollable container with fade gradients and styled scrollbar.",
    implementation: IMPL_SCROLLAREA,
    props: [
      { name: "maxHeight", type: "number | string" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "Overline",
    path: "@/primitives/typography",
    description: "Uppercase label text for section headers",
    implementation: IMPL_OVERLINE,
    props: [
      { name: "size", type: "enum", options: ["sm", "md", "lg"], default: '"md"' },
      { name: "muted", type: "boolean", default: "true" },
    ],
  },
];

export function SurfacesExtrasWithSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="surfaces-extras"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <SurfacesExtras />
      <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Surfaces Extras" code={SOURCE_CODE} components={COMPONENTS} />
    </>
  );
}
