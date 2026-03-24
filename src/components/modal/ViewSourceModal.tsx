import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDraggableModal } from "@/components/hooks/useDraggableModal";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

/* ------------------------------------------------------------------ */
/*  Simple regex-based syntax highlighting for JSX/TSX code            */
/* ------------------------------------------------------------------ */

const SYNTAX_RULES: Array<{ pattern: RegExp; color: string }> = [
  // Comments (// ...)
  { pattern: /(\/\/[^\n]*)/g, color: "#546e7a" },
  // Strings (single/double/backtick quoted)
  { pattern: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, color: "#c3e88d" },
  // Keywords
  { pattern: /\b(import|from|export|const|let|var|function|return|default|if|else|true|false|null|undefined)\b/g, color: "#c792ea" },
  // Components / Types (capitalized identifiers)
  { pattern: /\b([A-Z][A-Za-z0-9]+)\b/g, color: "#82aaff" },
  // Props / attributes (word followed by =)
  { pattern: /\b([a-z][A-Za-z0-9]*)\s*(?==)/g, color: "#f78c6c" },
  // Punctuation
  { pattern: /([{}()<>\/;=])/g, color: "#89ddff" },
];

function highlightCode(code: string): string {
  // Tokenize to avoid overlapping replacements
  type Token = { start: number; end: number; color: string };
  const tokens: Token[] = [];

  for (const rule of SYNTAX_RULES) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(code)) !== null) {
      const group = match[1] ?? match[0];
      const start = match.index + (match[0].indexOf(group));
      const end = start + group.length;
      tokens.push({ start, end, color: rule.color });
    }
  }

  // Sort by start position; earlier rules win on overlap
  tokens.sort((a, b) => a.start - b.start || a.end - b.end);

  // Remove overlapping tokens (first match wins)
  const filtered: Token[] = [];
  let lastEnd = -1;
  for (const t of tokens) {
    if (t.start >= lastEnd) {
      filtered.push(t);
      lastEnd = t.end;
    }
  }

  // Build HTML
  let result = "";
  let cursor = 0;
  for (const t of filtered) {
    if (t.start > cursor) {
      result += escapeHtml(code.slice(cursor, t.start));
    }
    result += `<span style="color:${t.color}">${escapeHtml(code.slice(t.start, t.end))}</span>`;
    cursor = t.end;
  }
  if (cursor < code.length) {
    result += escapeHtml(code.slice(cursor));
  }

  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ------------------------------------------------------------------ */
/*  ViewSourceModal                                                     */
/* ------------------------------------------------------------------ */

interface ViewSourceModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  code: string;
}

export function ViewSourceModal({ open, onClose, title, code }: ViewSourceModalProps) {
  const [mounted, setMounted] = useState(false);
  const isDark = useDarkMode();

  const { panelRef, panelStyle, backdropDragged, onDragStart } = useDraggableModal({
    isOpen: open,
    onClose,
  });

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!mounted || !open) return null;

  const lines = code.split("\n");
  const lineNumberWidth = String(lines.length).length;

  const highlighted = lines.map((line) => highlightCode(line));

  return createPortal(
    <div
      className={`fixed inset-0 z-[900] bg-black/20 backdrop-blur-[var(--glass-blur-overlay)] flex items-center justify-center overflow-y-auto p-5 dark:bg-black/40 ${backdropDragged ? "items-start justify-start p-0" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — Source`}
    >
      <div
        ref={panelRef}
        className="glass-panel max-w-[92vw] max-h-[calc(100vh-40px)] select-none cursor-grab active:cursor-grabbing flex flex-col"
        style={{ ...panelStyle, width: "min(600px, 90vw)" }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onDragStart}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 relative z-1">
          <span className="text-[14px] font-[650] text-text-primary tracking-[-0.01em]">
            {title} — Source
          </span>
          <button
            className="w-7 h-7 flex items-center justify-center border-none bg-black/6 rounded-full cursor-pointer text-text-secondary transition-all duration-200 ease-default hover:bg-black/10 hover:text-text-primary dark:bg-white/8 dark:hover:bg-white/14"
            onClick={onClose}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Code area */}
        <div
          className="mx-4 mb-4 rounded-[var(--glass-radius-sm)] overflow-auto"
          style={{
            background: "#1a1a1a",
            maxHeight: "min(520px, 70vh)",
            scrollbarWidth: "thin",
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <pre
            style={{
              margin: 0,
              padding: "16px 0",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              lineHeight: "1.7",
              color: "#d4d4d4",
              tabSize: 2,
            }}
          >
            {highlighted.map((html, i) => (
              <div key={i} style={{ display: "flex", paddingRight: "16px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: `${lineNumberWidth + 2}ch`,
                    minWidth: "3ch",
                    paddingLeft: "16px",
                    textAlign: "right",
                    paddingRight: "16px",
                    color: "#555",
                    userSelect: "none",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{ flex: 1, minWidth: 0 }}
                  dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }}
                />
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ------------------------------------------------------------------ */
/*  ViewSourceButton                                                    */
/* ------------------------------------------------------------------ */

interface ViewSourceButtonProps {
  code: string;
  title: string;
}

export function ViewSourceButton({ code, title }: ViewSourceButtonProps) {
  const [open, setOpen] = useState(false);
  const isDark = useDarkMode();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="View Source Code"
        aria-label="View Source Code"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 5,
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "none",
          background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)",
          cursor: "pointer",
          transition: "background 0.15s, color 0.15s",
          fontSize: "12px",
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.10)";
          (e.currentTarget as HTMLButtonElement).style.color = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
          (e.currentTarget as HTMLButtonElement).style.color = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";
        }}
      >
        {"</>"}
      </button>
      <ViewSourceModal open={open} onClose={() => setOpen(false)} title={title} code={code} />
    </>
  );
}
