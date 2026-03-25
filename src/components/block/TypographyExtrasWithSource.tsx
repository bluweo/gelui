import { useState, useEffect } from "react";
import { TypographyExtras } from "./TypographyExtras";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `import { Blockquote, List, Kbd, Overline, Label } from "@/primitives/typography";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

export function TypographyExtras() {
  const isDark = useDarkMode();

  return (
    <div className="flex flex-col gap-5">
      {/* Blockquote */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white/60 dark:bg-black/30">
        <div className="flex items-center px-3 py-2 bg-black/[0.04] border-b">
          <Overline size="md">Blockquote</Overline>
        </div>
        <div className="p-4">
          <Blockquote author="Dieter Rams" source="Ten Principles of Good Design">
            Good design is as little design as possible. Less, but better...
          </Blockquote>
        </div>
      </div>

      {/* Lists */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white/60 dark:bg-black/30">
        <div className="flex items-center px-3 py-2 bg-black/[0.04] border-b">
          <Overline size="md">Lists</Overline>
        </div>
        <div className="flex">
          <div className="flex-1 p-4 border-r">
            <Label className="type-label block mb-3">Unordered</Label>
            <List items={["Design tokens", "Glass primitives", "Layout compositions"]} />
          </div>
          <div className="flex-1 p-4">
            <Label className="type-label block mb-3">Ordered</Label>
            <List ordered items={["Install dependencies", "Configure tokens", "Import primitives"]} />
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white/60 dark:bg-black/30">
        <div className="flex items-center px-3 py-2 bg-black/[0.04] border-b">
          <Overline size="md">Keyboard Shortcuts</Overline>
        </div>
        {[
          { label: "Command Palette", keys: ["⌘", "K"] },
          { label: "Copy", keys: ["Ctrl", "C"] },
          { label: "Save", keys: ["⌘", "S"] },
          { label: "Undo", keys: ["⌘", "Z"] },
          { label: "Select All", keys: ["⌘", "A"] },
        ].map((shortcut) => (
          <div className="flex items-center justify-between px-3 py-2.5 border-b">
            <span className="type-label">{shortcut.label}</span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key) => <Kbd>{key}</Kbd>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`;

const IMPL_BLOCKQUOTE = [
  'import { type ReactNode } from "react";',
  'import { useDarkMode } from "../hooks/useDarkMode";',
  '',
  'interface BlockquoteProps {',
  '  children: ReactNode;',
  '  author?: string;',
  '  source?: string;',
  '}',
  '',
  'export function Blockquote({ children, author, source }: BlockquoteProps) {',
  '  const dark = useDarkMode();',
  '  return (',
  '    <blockquote style={{',
  '      margin: 0,',
  '      padding: "12px 0 12px 20px",',
  '      borderLeft: `4px solid ${dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)"}`,',
  '    }}>',
  '      <div className="type-body" style={{ fontStyle: "italic" }}>',
  '        {children}',
  '      </div>',
  '      {(author || source) && (',
  '        <footer className="type-caption" style={{ marginTop: 8 }}>',
  '          {author && <span>&mdash; {author}</span>}',
  '          {source && <cite>{source}</cite>}',
  '        </footer>',
  '      )}',
  '    </blockquote>',
  '  );',
  '}',
].join("\n");

const IMPL_LIST = [
  'import { useDarkMode } from "../hooks/useDarkMode";',
  '',
  'interface ListProps {',
  '  items: (string | React.ReactNode)[];',
  '  ordered?: boolean;',
  '  spacing?: "sm" | "md" | "lg";',
  '}',
  '',
  'export function List({ items, ordered = false, spacing = "md" }: ListProps) {',
  '  const dark = useDarkMode();',
  '  const gap = { sm: 4, md: 8, lg: 12 }[spacing];',
  '',
  '  return (',
  '    <ul style={{ margin: 0, padding: 0, listStyle: "none", gap }}>',
  '      {items.map((item, i) => (',
  '        <li key={i} className="type-body" style={{ display: "flex", gap: 8 }}>',
  '          <span>{ordered ? `${i + 1}.` : "•"}</span>',
  '          <span>{item}</span>',
  '        </li>',
  '      ))}',
  '    </ul>',
  '  );',
  '}',
].join("\n");

const IMPL_KBD = [
  'import { useDarkMode } from "../hooks/useDarkMode";',
  '',
  'interface KbdProps { children: string; }',
  '',
  'export function Kbd({ children }: KbdProps) {',
  '  const dark = useDarkMode();',
  '  return (',
  '    <kbd style={{',
  '      display: "inline-block",',
  '      padding: "2px 8px",',
  '      fontFamily: "var(--font-mono)",',
  '      fontSize: "11px",',
  '      borderRadius: 6,',
  '      border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,',
  '      background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",',
  '      boxShadow: `0 1px 2px ${dark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.08)"}`,',
  '    }}>',
  '      {children}',
  '    </kbd>',
  '  );',
  '}',
].join("\n");

const COMPONENTS = [
  { name: "Blockquote", path: "@/primitives/typography", description: "Pull quote with accent border and author citation", implementation: IMPL_BLOCKQUOTE },
  { name: "List", path: "@/primitives/typography", description: "Styled ordered/unordered list with configurable spacing", implementation: IMPL_LIST },
  { name: "Kbd", path: "@/primitives/typography", description: "Keyboard shortcut key indicator", implementation: IMPL_KBD },
  { name: "Overline", path: "@/primitives/typography", description: "Uppercase label text for section headers" },
  { name: "Label", path: "@/primitives/typography", description: "Form label with required indicator support" },
];

export function TypographyExtrasWithSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="typography-extras"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <TypographyExtras />
      <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Typography Extras" code={SOURCE_CODE} components={COMPONENTS} />
    </>
  );
}
