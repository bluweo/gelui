import { type CSSProperties, useState, useRef, useEffect } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

interface SelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}

export function SearchableSelect({
  options = [],
  value,
  onChange,
  placeholder = "Search & select...",
  className = "",
  style,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIdx, setHighlightIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (open) {
      setSearch("");
      setHighlightIdx(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIdx >= 0 && filtered[highlightIdx]) {
      e.preventDefault();
      onChange?.(filtered[highlightIdx].value);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const highlightMatch = (text: string) => {
    if (!search) return text;
    const idx = text.toLowerCase().indexOf(search.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <strong className="font-bold">
          {text.slice(idx, idx + search.length)}
        </strong>
        {text.slice(idx + search.length)}
      </>
    );
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
          "border-2 bg-[var(--theme-header-bg)]",
          "cursor-pointer text-left flex items-center justify-between",
          "outline-none transition-all duration-200",
          open ? "border-[var(--theme-fg)]" : "border-transparent",
          selected ? "text-[var(--theme-fg)]" : "text-[var(--theme-fg-subtle)]",
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
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 rounded-[var(--glass-radius-sm,10px)] bg-[var(--theme-table-bg)] backdrop-blur-[20px] border border-[var(--theme-divider)] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-2 overflow-hidden">
          <div className="pb-1.5">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightIdx(0);
              }}
              placeholder="Type to filter..."
              className="w-full py-2 px-3 text-[13px] font-[family-name:var(--font-body)] border-none rounded-[var(--glass-radius-sm,8px)] bg-[var(--theme-header-bg)] text-[var(--theme-fg)] outline-none"
            />
          </div>
          <div className="max-h-[180px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="py-2.5 px-3 text-[13px] opacity-40 text-center">
                No results
              </div>
            ) : (
              filtered.map((opt, i) => (
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
                    "text-[var(--theme-fg)]",
                    i === highlightIdx ? "bg-[var(--theme-header-bg)]" : "bg-transparent",
                    opt.value === value ? "font-semibold" : "font-normal",
                  ].join(" ")}
                >
                  {highlightMatch(opt.label)}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
