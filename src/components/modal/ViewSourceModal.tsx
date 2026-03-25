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

interface ComponentInfo {
  name: string;
  path: string;
  description?: string;
  implementation?: string;
}

interface ViewSourceModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  code: string;
  components?: ComponentInfo[];
}

type TabKey = "source" | "components" | "implementation";

const TABS: { key: TabKey; label: string; icon: JSX.Element }[] = [
  {
    key: "source",
    label: "Source",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    key: "components",
    label: "Components",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3H5C3 2 2 3 2 5v2c0 2 1 3 3 3ZM17 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM17 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM5 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3H5c-2 0-3 1-3 3v2c0 2 1 3 3 3Z" /></svg>,
  },
  {
    key: "implementation",
    label: "Implementation",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 22.75H8c-3.65 0-5.75-2.1-5.75-5.75V7c0-3.65 2.1-5.75 5.75-5.75h8c3.65 0 5.75 2.1 5.75 5.75v10c0 3.65-2.1 5.75-5.75 5.75Z" /><path d="M9.25 2v20M9 11l2 2-2 2M15 11l-2 2 2 2" /></svg>,
  },
];

export function ViewSourceModal({ open, onClose, title, code, components = [] }: ViewSourceModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("source");
  const [selectedImpl, setSelectedImpl] = useState(0);
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

  // Reset to source tab when opened
  useEffect(() => { if (open) setActiveTab("source"); }, [open]);

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
        className="glass-panel max-w-[92vw] max-h-[calc(100vh-40px)] select-none cursor-grab active:cursor-grabbing flex flex-col overflow-hidden !border-none"
        style={{ ...panelStyle, width: "min(768px, 92vw)" }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onDragStart}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 relative z-1">
          <span className="text-[14px] font-[650] text-text-primary tracking-[-0.01em]">
            {title}
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

        {/* Tabs */}
        <div
          className="flex gap-1 mx-5 mb-4 relative z-1 p-0.5 rounded-[10px] bg-black/[0.04] dark:bg-white/[0.06]"
          role="tablist"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-[7px] rounded-[8px] text-[13px] font-[590] tracking-[-0.01em] cursor-pointer border-none transition-all duration-200 ease-[var(--transition-apple)] ${
                  isActive
                    ? "bg-white/80 text-text-primary shadow-[0_1px_3px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.04)] dark:bg-white/[0.12] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_0_0_0.5px_rgba(255,255,255,0.06)]"
                    : "bg-transparent text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === "source" ? (
          /* Source Code tab */
          <div
            className="overflow-auto flex-1"
            style={{
              background: "#1a1a1a",
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
        ) : activeTab === "components" ? (
          /* Components tab */
          <div
            className="overflow-auto flex-1"
            style={{
              maxHeight: "min(520px, 70vh)",
              scrollbarWidth: "thin",
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {components.length > 0 ? (
              <div className="flex flex-col">
                {components.map((comp, i) => (
                  <div
                    key={comp.name}
                    className={`flex items-start gap-3 px-4 py-3 ${i < components.length - 1 ? "border-b border-black/[0.04] dark:border-white/[0.04]" : ""}`}
                  >
                    <div
                      className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)" }}>
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-[600]" style={{ color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)" }}>{comp.name}</span>
                        <span
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px]"
                          style={{
                            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                            color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                          }}
                        >
                          {comp.path}
                        </span>
                      </div>
                      {comp.description && (
                        <p className="text-[11px] mt-0.5" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
                          {comp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)", marginBottom: 12 }}>
                  <path d="M5 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3H5C3 2 2 3 2 5v2c0 2 1 3 3 3ZM17 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM17 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM5 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3H5c-2 0-3 1-3 3v2c0 2 1 3 3 3Z" />
                </svg>
                <span className="text-[12px]" style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>
                  Component list coming soon
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Implementation tab */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Component selector */}
            {components.filter(c => c.implementation).length > 0 ? (
              <>
                <div
                  className="flex gap-2 px-5 pb-3 overflow-x-auto"
                  style={{ scrollbarWidth: "none" }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {components.filter(c => c.implementation).map((comp, i) => (
                    <button
                      key={comp.name}
                      onClick={() => setSelectedImpl(i)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-[550] border-none cursor-pointer transition-all duration-150 whitespace-nowrap ${
                        selectedImpl === i
                          ? "bg-black/80 text-white dark:bg-white/80 dark:text-black"
                          : "bg-black/[0.04] text-black/50 hover:bg-black/[0.08] hover:text-black/70 dark:bg-white/[0.06] dark:text-white/40 dark:hover:bg-white/[0.12] dark:hover:text-white/60"
                      }`}
                    >
                      {comp.name}
                    </button>
                  ))}
                </div>
                {/* Implementation code */}
                {(() => {
                  const implComponents = components.filter(c => c.implementation);
                  const comp = implComponents[selectedImpl];
                  if (!comp?.implementation) return null;
                  const implLines = comp.implementation.split("\n");
                  const implLineWidth = String(implLines.length).length;
                  const implHighlighted = implLines.map((line) => highlightCode(line));
                  return (
                    <div
                      className="overflow-auto flex-1"
                      style={{ background: "#1a1a1a", scrollbarWidth: "thin" }}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "#888" }}>
                          {comp.path}/{comp.name}.tsx
                        </span>
                      </div>
                      <pre style={{ margin: 0, padding: "12px 0", fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.7", color: "#d4d4d4", tabSize: 2 }}>
                        {implHighlighted.map((html, i) => (
                          <div key={i} style={{ display: "flex", paddingRight: "16px" }}>
                            <span style={{ display: "inline-block", width: `${implLineWidth + 2}ch`, minWidth: "3ch", paddingLeft: "16px", textAlign: "right", paddingRight: "16px", color: "#555", userSelect: "none", flexShrink: 0 }}>
                              {i + 1}
                            </span>
                            <span style={{ flex: 1, minWidth: 0 }} dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }} />
                          </div>
                        ))}
                      </pre>
                    </div>
                  );
                })()}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)", marginBottom: 12 }}>
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
                <span className="text-[12px]" style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>
                  Implementation code coming soon
                </span>
              </div>
            )}
          </div>
        )}
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="View Source Code"
        aria-label="View Source Code"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-white/[0.08] transition-all duration-150 cursor-pointer shrink-0 relative z-20 float-right"
        style={{ marginTop: -38 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black/50 dark:text-white/40">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </button>
      <ViewSourceModal open={open} onClose={() => setOpen(false)} title={title} code={code} />
    </>
  );
}
