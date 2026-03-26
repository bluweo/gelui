import { useState, type ReactNode, type CSSProperties } from "react";
import { ArrowDown2 } from "iconsax-react";

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: number[];
  className?: string;
  style?: CSSProperties;
}

function AccordionSection({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="prim-accordion-item">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="prim-accordion-trigger"
      >
        {title}
        <span
          className={[
            "flex items-center transition-transform duration-[250ms]",
            isOpen ? "rotate-180" : "rotate-0",
          ].join(" ")}
        >
          <ArrowDown2 size={18} color="var(--theme-fg-muted)" variant="Linear" />
        </span>
      </button>
      <div
        className="prim-accordion-content"
        data-open={isOpen || undefined}
      >
        <div className="prim-accordion-body">
          {content}
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className = "",
  style,
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    new Set(defaultOpen),
  );

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div
      className={`flex flex-col gap-1.5 ${className}`}
      style={style}
    >
      {items.map((item, i) => (
        <AccordionSection
          key={i}
          title={item.title}
          content={item.content}
          isOpen={openIndexes.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
