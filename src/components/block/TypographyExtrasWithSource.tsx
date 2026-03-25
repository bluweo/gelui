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

const COMPONENTS = [
  { name: "Blockquote", path: "@/primitives/typography", description: "Pull quote with accent border and author citation" },
  { name: "List", path: "@/primitives/typography", description: "Styled ordered/unordered list with configurable spacing" },
  { name: "Kbd", path: "@/primitives/typography", description: "Keyboard shortcut key indicator" },
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
