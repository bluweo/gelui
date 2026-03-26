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
        <strong style={{ fontWeight: 700 }}>
          {text.slice(idx, idx + search.length)}
        </strong>
        {text.slice(idx + search.length)}
      </>
    );
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", width: "100%", ...style }}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          borderRadius: "var(--glass-radius-sm, 10px)",
          border: `2px solid ${open ? "var(--theme-fg)" : "transparent"}`,
          background: "var(--theme-header-bg)",
          color: selected
            ? "var(--theme-fg)"
            : "var(--theme-fg-subtle)",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          outline: "none",
          transition: "all 200ms ease",
        }}
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
          style={{
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 50,
            borderRadius: "var(--glass-radius-sm, 10px)",
            background: "var(--theme-table-bg)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid var(--theme-divider)`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            padding: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "0 0 6px" }}>
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightIdx(0);
              }}
              placeholder="Type to filter..."
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "13px",
                fontFamily: "var(--font-body)",
                border: "none",
                borderRadius: "var(--glass-radius-sm, 8px)",
                background: "var(--theme-header-bg)",
                color: "var(--theme-fg)",
                outline: "none",
                marginBottom: "0",
              }}
            />
          </div>
          <div style={{ maxHeight: "180px", overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: "10px 12px",
                  fontSize: "13px",
                  opacity: 0.4,
                  textAlign: "center",
                }}
              >
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
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    fontFamily: "var(--font-body)",
                    border: "none",
                    borderRadius: "var(--glass-radius-sm, 8px)",
                    background:
                      i === highlightIdx
                        ? "var(--theme-header-bg)"
                        : "transparent",
                    color: "var(--theme-fg)",
                    fontWeight: opt.value === value ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    outline: "none",
                    transition: "background 100ms ease",
                  }}
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
