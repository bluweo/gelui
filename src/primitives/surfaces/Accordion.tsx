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
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, content]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--theme-header-bg)",
        borderRadius: "var(--glass-radius-sm, 10px)",
        overflow: "hidden",
        transition: "background 0.15s ease",
        filter: hovered ? "brightness(0.97)" : "none",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "12px 16px",
          border: "none",
          background: "none",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          fontFamily: "var(--font-ui)",
          color: "var(--theme-fg)",
          textAlign: "left",
          transition: "background 0.15s ease",
        }}
      >
        {title}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            transition: "transform 0.25s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ArrowDown2 size={18} color="var(--theme-fg-muted)" variant="Linear" />
        </span>
      </button>
      <div
        style={{
          overflow: "hidden",
          transition: "height 0.25s ease",
          height: isOpen ? `${height}px` : "0px",
        }}
      >
        <div
          ref={contentRef}
          style={{
            padding: "0 16px 12px",
            fontSize: "13px",
            color: "var(--theme-fg-muted)",
            lineHeight: 1.5,
          }}
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
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        ...style,
      }}
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
