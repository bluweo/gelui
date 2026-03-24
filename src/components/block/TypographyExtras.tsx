import { Blockquote, List, Kbd, Overline, Label } from "@/primitives/typography";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

export function TypographyExtras() {
  const isDark = useDarkMode();

  return (
    <div className="flex flex-col gap-5">
      {/* Blockquote */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white/60 dark:bg-black/30">
        <div className="flex items-center px-3 py-2 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.06]">
          <Overline size="md">Blockquote</Overline>
        </div>
        <div className="p-4">
          <Blockquote author="Dieter Rams" source="Ten Principles of Good Design">
            Good design is as little design as possible. Less, but better, because it concentrates on the essential aspects, and the products are not burdened with non-essentials.
          </Blockquote>
        </div>
      </div>

      {/* Lists */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white/60 dark:bg-black/30">
        <div className="flex items-center px-3 py-2 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.06]">
          <Overline size="md">Lists</Overline>
        </div>
        <div className="flex max-[540px]:flex-col">
          <div className="flex-1 p-4 border-r border-black/[0.04] dark:border-white/[0.04] max-[540px]:border-r-0 max-[540px]:border-b">
            <Label className="type-label text-black/60 dark:text-white/55 block mb-3">Unordered</Label>
            <List
              items={[
                "Design tokens",
                "Glass primitives",
                "Layout compositions",
                "Interactive controls",
              ]}
            />
          </div>
          <div className="flex-1 p-4">
            <Label className="type-label text-black/60 dark:text-white/55 block mb-3">Ordered</Label>
            <List
              ordered
              items={[
                "Install dependencies",
                "Configure tokens",
                "Import primitives",
                "Build components",
              ]}
            />
          </div>
        </div>
      </div>

      {/* Kbd */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-white/60 dark:bg-black/30">
        <div className="flex items-center px-3 py-2 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.06]">
          <Overline size="md">Keyboard Shortcuts</Overline>
        </div>
        {[
          { label: "Command Palette", keys: ["⌘", "K"] },
          { label: "Copy", keys: ["Ctrl", "C"] },
          { label: "Save", keys: ["⌘", "S"] },
          { label: "Undo", keys: ["⌘", "Z"] },
          { label: "Select All", keys: ["⌘", "A"] },
        ].map((shortcut, i, arr) => (
          <div
            key={shortcut.label}
            className={`flex items-center justify-between gap-3 px-3 py-2.5 ${i < arr.length - 1 ? "border-b border-black/[0.04] dark:border-white/[0.04]" : ""}`}
          >
            <span className="type-label text-black/75 dark:text-white/70">{shortcut.label}</span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, j) => (
                <span key={j} className="flex items-center gap-1">
                  <Kbd>{key}</Kbd>
                  {j < shortcut.keys.length - 1 && (
                    <span className="text-[11px] text-black/25 dark:text-white/20">+</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
