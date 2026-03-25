import { type CSSProperties, useState, useRef } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
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
  const dark = useDarkMode();
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
          padding: "12px 16px",
          fontSize: "14px",
          fontFamily: "var(--font-body)",
          borderRadius: "var(--glass-radius-sm, 10px)",
          border: `2px solid ${open ? (dark ? "#fff" : "#000") : "transparent"}`,
          background: dark
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.6)",
          color: selected
            ? dark
              ? "#fff"
              : "#000"
            : dark
              ? "rgba(255,255,255,0.4)"
              : "rgba(0,0,0,0.4)",
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
            background: dark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            padding: "6px 8px",
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
                padding: "10px 12px",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                border: "none",
                borderRadius: "var(--glass-radius-sm, 8px)",
                background:
                  i === highlightIdx
                    ? dark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.04)"
                    : "transparent",
                color:
                  opt.value === value
                    ? dark
                      ? "#fff"
                      : "#000"
                    : dark
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(0,0,0,0.7)",
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
