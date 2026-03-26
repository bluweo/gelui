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
      className={className}
      style={{ position: "relative", width: "100%", ...style }}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          borderRadius: "var(--glass-radius-sm, 10px)",
          border: `2px solid ${open ? "var(--theme-bg-solid)" : "transparent"}`,
          background: "var(--theme-divider)",
          color: selected
            ? "var(--theme-bg-solid)"
            : "var(--theme-fg-muted)",
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
            border: "1px solid var(--theme-divider)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            paddingTop: 6, paddingBottom: 6, paddingLeft: 8, paddingRight: 8,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {options.map((opt, i) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              onMouseEnter={() => setHighlightIdx(i)}
              style={{
                width: "100%",
                paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12,
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                border: "none",
                borderRadius: "var(--glass-radius-sm, 8px)",
                background:
                  i === highlightIdx
                    ? "var(--theme-header-bg)"
                    : "transparent",
                color:
                  opt.value === value
                    ? "var(--theme-bg-solid)"
                    : "var(--theme-fg)",
                fontWeight: opt.value === value ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                outline: "none",
                transition: "background 100ms ease",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
