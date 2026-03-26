import { useState, useEffect } from "react";
import { SurfacesExtras } from "./SurfacesExtras";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `import { Accordion, ScrollArea } from "@/primitives/surfaces";
import { Overline } from "@/primitives/typography";

export function SurfacesExtras() {
  const faqItems = [
    { title: "What are design tokens?", content: "Design tokens are the visual design atoms..." },
    { title: "How do glass surfaces work?", content: "Glass surfaces combine backdrop-filter blur..." },
    { title: "Can I customize the primitives?", content: "Yes — all primitives accept className and style props..." },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Accordion */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <Overline size="md" muted>Accordion</Overline>
        </div>
        <div className="p-4">
          <Accordion items={faqItems} defaultOpen={[0]} />
        </div>
      </div>

      {/* ScrollArea */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <Overline size="md" muted>Scroll Area</Overline>
        </div>
        <div className="p-4">
          <ScrollArea maxHeight={200}>
            <p className="type-body text-[var(--theme-fg)]">
              Every surface in Gel UI is built on a foundation of translucent layers...
            </p>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}`;

const IMPL_ACCORDION = `import { useState, type ReactNode, type CSSProperties } from "react";
import { ArrowDown2 } from "iconsax-react";

interface AccordionItem { title: string; content: ReactNode; }
interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: number[];
  className?: string;
  style?: CSSProperties;
}

function AccordionSection({ title, content, isOpen, onToggle }: {
  title: string; content: ReactNode; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="prim-accordion-item">
      <button type="button" onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="prim-accordion-trigger">
        {title}
        <span className={\`flex items-center transition-transform duration-[250ms] \${isOpen ? "rotate-180" : "rotate-0"}\`}>
          <ArrowDown2 size={18} color="var(--theme-fg-muted)" variant="Linear" />
        </span>
      </button>
      <div className="prim-accordion-content" data-open={isOpen || undefined}>
        <div className="prim-accordion-body">{content}</div>
      </div>
    </div>
  );
}

export function Accordion({ items, multiple = false, defaultOpen = [], className = "", style }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set(defaultOpen));
  const toggle = (i: number) => {
    setOpenIndexes(prev => {
      const next = new Set(multiple ? prev : []);
      prev.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };
  return (
    <div className={\`flex flex-col gap-1.5 \${className}\`} style={style}>
      {items.map((item, i) => (
        <AccordionSection key={i} title={item.title} content={item.content}
          isOpen={openIndexes.has(i)} onToggle={() => toggle(i)} />
      ))}
    </div>
  );
}`;

const IMPL_SCROLLAREA = `import { type ReactNode, type CSSProperties } from "react";

interface ScrollAreaProps {
  maxHeight: number | string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function ScrollArea({ maxHeight, children, className = "", style }: ScrollAreaProps) {
  const mh = typeof maxHeight === "number" ? \`\${maxHeight}px\` : maxHeight;
  return (
    <div className={\`prim-scroll-area \${className}\`}
      style={{ "--scroll-mh": mh, ...style } as CSSProperties}>
      <div className="prim-scroll-fade-top" />
      <div className="prim-scroll-inner">{children}</div>
      <div className="prim-scroll-fade-bottom" />
    </div>
  );
}`;

const COMPONENTS = [
  {
    name: "Accordion",
    path: "@/primitives/surfaces",
    description: "Expandable/collapsible sections with CSS grid animation. SSR-safe — no scrollHeight measurement.",
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
    description: "Constrained scrollable container with top/bottom fade gradients and styled scrollbar.",
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
