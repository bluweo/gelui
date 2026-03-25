import { useState, useEffect } from "react";
import { SurfacesExtras } from "./SurfacesExtras";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `import { Accordion, ScrollArea } from "@/primitives/surfaces";
import { Overline } from "@/primitives/typography";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

export function SurfacesExtras() {
  const isDark = useDarkMode();

  const faqItems = [
    {
      title: "What are design tokens?",
      content: "Design tokens are the visual design atoms...",
    },
    {
      title: "How do glass surfaces work?",
      content: "Glass surfaces combine backdrop-filter blur...",
    },
    {
      title: "Can I customize the primitives?",
      content: "Yes — all primitives accept className and style props...",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Accordion */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden">
        <div className="flex items-center px-3 py-2">
          <Overline size="md" muted>Accordion</Overline>
        </div>
        <Accordion items={faqItems} defaultOpen={[0]} />
      </div>

      {/* ScrollArea */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden">
        <div className="flex items-center px-3 py-2">
          <Overline size="md" muted>Scroll Area</Overline>
        </div>
        <ScrollArea maxHeight={200}>
          <p className="type-body">
            Every surface in Gel UI is built on a foundation
            of translucent layers...
          </p>
        </ScrollArea>
      </div>
    </div>
  );
}`;

const IMPL_ACCORDION = `import { useState, useRef, useEffect, type ReactNode } from "react";
import { ArrowDown2 } from "iconsax-react";
import { useDarkMode } from "../hooks/useDarkMode";

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: number[];
}

export function Accordion({ items, multiple = false, defaultOpen = [] }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set(defaultOpen));
  const dark = useDarkMode();

  const toggle = (index: number) => {
    setOpenIndexes(prev => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <AccordionSection
          key={i}
          title={item.title}
          content={item.content}
          isOpen={openIndexes.has(i)}
          onToggle={() => toggle(i)}
          dark={dark}
        />
      ))}
    </div>
  );
}`;

const IMPL_SCROLLAREA = `import { type ReactNode, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface ScrollAreaProps {
  maxHeight: number | string;
  children: ReactNode;
}

export function ScrollArea({ maxHeight, children }: ScrollAreaProps) {
  const isDark = useDarkMode();

  return (
    <div style={{
      maxHeight,
      overflowY: "auto",
      position: "relative",
      scrollbarWidth: "thin",
      scrollbarColor: isDark
        ? "rgba(255,255,255,0.15) transparent"
        : "rgba(0,0,0,0.12) transparent",
    }}>
      {children}
    </div>
  );
}`;

const COMPONENTS = [
  { name: "Accordion", path: "@/primitives/surfaces", description: "Expandable/collapsible sections with smooth animation", implementation: IMPL_ACCORDION },
  { name: "ScrollArea", path: "@/primitives/surfaces", description: "Custom scrollbar container with styled overflow", implementation: IMPL_SCROLLAREA },
  { name: "Overline", path: "@/primitives/typography", description: "Uppercase label text for section headers" },
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
