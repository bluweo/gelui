import { type CSSProperties, useState, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}

export function Select({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  className = "",
  style,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const selected = options.find((o) => o.value === value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setOpen(true);
      setHighlightIdx(0);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIdx >= 0) {
      e.preventDefault();
      onChange?.(options[highlightIdx].value);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`relative w-full ${className}`}
      style={style}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => setOpen(!open)}
        className={[
          "w-full py-3 px-4 text-sm font-[family-name:var(--font-body)]",
          "rounded-[var(--glass-radius-sm,10px)]",
          "border-2 bg-[var(--theme-divider)]",
          "cursor-pointer text-left flex items-center justify-between",
          "outline-none transition-all duration-200",
          open ? "border-[var(--theme-bg-solid)]" : "border-transparent",
          selected ? "text-[var(--theme-bg-solid)]" : "text-[var(--theme-fg-muted)]",
        ].join(" ")}
      >
        <span>{selected?.label ?? placeholder}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 rounded-[var(--glass-radius-sm,10px)] bg-[var(--theme-table-bg)] backdrop-blur-[20px] border border-[var(--theme-divider)] shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-1.5 px-2 max-h-[200px] overflow-y-auto">
          {options.map((opt, i) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              onMouseEnter={() => setHighlightIdx(i)}
              className={[
                "w-full py-2.5 px-3 text-sm font-[family-name:var(--font-body)]",
                "border-none rounded-[var(--glass-radius-sm,8px)]",
                "cursor-pointer text-left outline-none transition-colors duration-100",
                i === highlightIdx ? "bg-[var(--theme-header-bg)]" : "bg-transparent",
                opt.value === value ? "text-[var(--theme-bg-solid)] font-semibold" : "text-[var(--theme-fg)] font-normal",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
