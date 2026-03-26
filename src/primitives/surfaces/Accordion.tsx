import { useState, useRef, useEffect, type ReactNode, type CSSProperties } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, content]);

  return (
    <div
      className="bg-[var(--theme-header-bg)] rounded-[var(--glass-radius-sm,10px)] overflow-hidden transition-[filter] duration-150 hover:brightness-[0.97]"
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3 px-4 border-none bg-none cursor-pointer text-sm font-semibold font-[family-name:var(--font-ui)] text-[var(--theme-fg)] text-left transition-colors duration-150"
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
        className="overflow-hidden transition-[height] duration-[250ms]"
        style={{ height: isOpen ? `${height}px` : "0px" }}
      >
        <div
          ref={contentRef}
          className="pt-0 pr-4 pb-3 pl-4 text-[13px] text-[var(--theme-fg-muted)] leading-relaxed"
        >
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
