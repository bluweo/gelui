import { useState, useRef, useEffect, type ReactNode, type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  dark,
}: {
  title: string;
  content: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  dark: boolean;
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
      style={{
        background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
        borderRadius: "var(--glass-radius-sm, 10px)",
        overflow: "hidden",
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
          color: dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
          textAlign: "left",
        }}
      >
        {title}
        <span
          style={{
            fontSize: "12px",
            transition: "transform 0.25s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
          }}
        >
          &#9660;
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
            color: dark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
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
  const dark = useDarkMode();
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
          dark={dark}
        />
      ))}
    </div>
  );
}
