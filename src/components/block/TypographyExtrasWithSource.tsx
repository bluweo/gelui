import { useState, useEffect } from "react";
import { TypographyExtras } from "./TypographyExtras";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_BLOCKQUOTE from "@/primitives/typography/Blockquote.tsx?raw";
import IMPL_LIST from "@/primitives/typography/List.tsx?raw";
import IMPL_KBD from "@/primitives/typography/Kbd.tsx?raw";
import IMPL_CODE from "@/primitives/typography/Code.tsx?raw";
import IMPL_OVERLINE from "@/primitives/typography/Overline.tsx?raw";
import IMPL_LABEL from "@/primitives/typography/Label.tsx?raw";

const SOURCE_CODE = `import { Blockquote, List, Kbd, Code, Overline, Label } from "@/primitives/typography";

export function TypographyExtras() {
  return (
    <div className="flex flex-col gap-5">
      {/* Blockquote */}
      <Blockquote author="Dieter Rams" source="Ten Principles of Good Design">
        Good design is as little design as possible.
      </Blockquote>

      {/* List */}
      <List items={["Design tokens", "Glass primitives", "Layout compositions"]} />
      <List ordered items={["Install dependencies", "Configure tokens", "Import primitives"]} />

      {/* Keyboard shortcuts */}
      <div className="flex gap-2">
        <Kbd keys={["Cmd", "K"]} /> Command Palette
      </div>

      {/* Inline code */}
      <p>Use the <Code>Button</Code> component with <Code>variant="solid"</Code></p>

      {/* Overline + Label */}
      <Overline>Section Label</Overline>
      <Label>Form label</Label>
    </div>
  );
}`;

const COMPONENTS = [
  {
    name: "Blockquote",
    path: "@/primitives/typography",
    description: "Pull quote with accent border and optional author/source citation",
    implementation: IMPL_BLOCKQUOTE,
    props: [
      { name: "author", type: "string" },
      { name: "source", type: "string" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "List",
    path: "@/primitives/typography",
    description: "Styled ordered/unordered list with configurable spacing",
    implementation: IMPL_LIST,
    props: [
      { name: "items", type: "(string | ReactNode)[]" },
      { name: "ordered", type: "boolean", default: "false" },
      { name: "spacing", type: "enum", options: ["sm", "md", "lg"], default: '"md"' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "Kbd",
    path: "@/primitives/typography",
    description: "Keyboard shortcut key indicator with visual key styling",
    implementation: IMPL_KBD,
    props: [
      { name: "keys", type: "string[]" },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "Code",
    path: "@/primitives/typography",
    description: "Inline code snippet or block code with syntax highlighting",
    implementation: IMPL_CODE,
    props: [
      { name: "inline", type: "boolean", default: "true" },
      { name: "highlightedChildren", type: "ReactNode" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "Overline",
    path: "@/primitives/typography",
    description: "Uppercase label text for section headers",
    implementation: IMPL_OVERLINE,
    props: [
      { name: "size", type: "enum", options: ["sm", "md", "lg"], default: '"md"' },
      { name: "muted", type: "boolean", default: "true" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "Label",
    path: "@/primitives/typography",
    description: "Form label with UI font role styling",
    implementation: IMPL_LABEL,
    props: [
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
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
