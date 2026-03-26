import { Accordion, ScrollArea } from "@/primitives/surfaces";
import { Overline } from "@/primitives/typography";

export function SurfacesExtras() {
  const faqItems = [
    {
      title: "What are design tokens?",
      content: "Design tokens are the visual design atoms of the design system — named entities that store visual attributes such as colors, typography, spacing, and elevation. They serve as a single source of truth, enabling consistency across platforms and themes.",
    },
    {
      title: "How do glass surfaces work?",
      content: "Glass surfaces combine backdrop-filter blur, semi-transparent backgrounds, and border treatments to create frosted glass aesthetics. Different levels (glass-0 through glass-3) provide increasing blur depth for various UI contexts like cards, modals, and overlays.",
    },
    {
      title: "Can I customize the primitives?",
      content: "Yes — all primitives accept className and style props for customization. They respect dark mode via the useDarkMode hook, and token values can be overridden at the CSS variable level for complete theming control.",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Accordion */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: "var(--theme-table-bg)", border: "1px solid var(--theme-divider)" }}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <Overline size="md" muted>Accordion</Overline>
        </div>
        <div style={{ padding: "16px" }}>
          <Accordion items={faqItems} defaultOpen={[0]} />
        </div>
      </div>

      {/* ScrollArea */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: "var(--theme-table-bg)", border: "1px solid var(--theme-divider)" }}>
        <div style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <Overline size="md" muted>Scroll Area</Overline>
        </div>
        <div style={{ padding: "16px" }}>
          <ScrollArea maxHeight={200}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingTop: 4, paddingBottom: 4, paddingLeft: 8, paddingRight: 8 }}>
              <p className="type-body" style={{ color: "var(--theme-fg)", margin: 0, lineHeight: 1.7 }}>
                Every surface in Gel UI is built on a foundation of translucent layers. The backdrop-filter property creates the signature frosted glass effect, while carefully tuned opacity values ensure text remains readable across any background. This approach allows interfaces to feel lightweight and contextual — the background becomes part of the design, not hidden behind it.
              </p>
              <p className="type-body" style={{ color: "var(--theme-fg)", margin: 0, lineHeight: 1.7 }}>
                The token system underpinning these surfaces provides granular control over blur intensity, saturation, transparency, and shadow depth. Each parameter can be adjusted independently through the Appearance settings, allowing users to find their preferred balance between translucency and readability. Dark mode automatically inverts the appropriate values while preserving the visual hierarchy.
              </p>
              <p className="type-body" style={{ color: "var(--theme-fg)", margin: 0, lineHeight: 1.7 }}>
                Primitives like Accordion and ScrollArea extend the surface concept by adding interactive behavior to contained areas. An accordion manages vertical space by revealing content on demand, while a scroll area constrains tall content within a fixed viewport with styled scrollbars. Both components inherit the design system's border radius, font settings, and dark mode tokens — ensuring visual consistency with every other primitive in the library.
              </p>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
