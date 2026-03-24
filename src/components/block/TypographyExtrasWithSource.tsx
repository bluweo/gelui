import { TypographyExtras } from "./TypographyExtras";
import { ViewSourceButton } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `import { Blockquote, List, Kbd, Overline, Label } from "@/primitives/typography";

export function TypographyExtras() {
  return (
    <div className="flex flex-col gap-5">
      {/* Blockquote */}
      <Overline>Blockquote</Overline>
      <Blockquote author="Dieter Rams" source="Ten Principles of Good Design">
        Good design is as little design as possible...
      </Blockquote>

      {/* Lists */}
      <Overline>Lists</Overline>
      <List items={["Design tokens", "Glass primitives", "Layout compositions"]} />
      <List ordered items={["Install dependencies", "Configure tokens", "Import primitives"]} />

      {/* Keyboard Shortcuts */}
      <Overline>Keyboard Shortcuts</Overline>
      <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
    </div>
  );
}`;

export function TypographyExtrasWithSource() {
  return (
    <div style={{ position: "relative" }}>
      <ViewSourceButton code={SOURCE_CODE} title="Typography Extras" />
      <TypographyExtras />
    </div>
  );
}
