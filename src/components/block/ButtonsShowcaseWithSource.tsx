import { ButtonsShowcase } from "./ButtonsShowcase";
import { ViewSourceButton } from "@/components/modal/ViewSourceModal";

const SOURCE_CODE = `import { Button, LinkButton } from "@/primitives/buttons";

export function ButtonsShowcase() {
  return (
    <>
      {/* Solid */}
      <Button variant="solid" size="md">Button</Button>
      <Button variant="solid" size="sm">Button</Button>

      {/* Ghost */}
      <Button variant="ghost" size="md">Button</Button>

      {/* Gel */}
      <Button variant="gel" size="sm">Small</Button>
      <Button variant="gel" size="md">Medium</Button>
      <Button variant="gel" size="lg">Large</Button>

      {/* Glass */}
      <Button variant="glass" size="md" shape="pill">Glass Pill</Button>

      {/* Action Pair */}
      <Button variant="ghost">Cancel</Button>
      <Button variant="solid">Apply</Button>

      {/* Link */}
      <LinkButton underline>Learn more</LinkButton>
      <LinkButton arrow>Explore</LinkButton>
    </>
  );
}`;

export function ButtonsShowcaseWithSource() {
  return (
    <div style={{ position: "relative" }}>
      <ViewSourceButton code={SOURCE_CODE} title="Buttons" />
      <ButtonsShowcase />
    </div>
  );
}
