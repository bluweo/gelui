import { Accordion, ScrollArea } from "@/primitives/surfaces";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";

export function SurfacesExtras() {
  const isDark = useDarkMode();

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const textColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";

  const faqItems = [
    {
      title: "What are design tokens?",
      content: "Design tokens are the visual design atoms of the design system. They are named entities that store visual design attributes such as colors, typography, spacing, and elevation values. Tokens allow you to maintain a consistent visual language across platforms.",
    },
    {
      title: "How do glass surfaces work?",
      content: "Glass surfaces use a combination of backdrop-filter for blur effects, semi-transparent backgrounds, and border treatments to create frosted glass aesthetics. Different levels (glass-0 through glass-3) provide increasing blur depth for various UI contexts.",
    },
    {
      title: "Can I customize the primitives?",
      content: "Yes, all primitives accept className and style props for customization. They also respect the design system's dark mode via the useDarkMode hook. Token values can be overridden at the CSS variable level for theming.",
    },
  ];

  const scrollContent = [
    "Design tokens provide a single source of truth for visual properties.",
    "Typography presets ensure consistent text styling across the application.",
    "Glass surfaces create depth through layered translucency and blur.",
    "Interactive controls offer accessible, keyboard-navigable components.",
    "Layout compositions handle spacing, alignment, and responsive grids.",
    "Feedback primitives communicate system status to users clearly.",
    "Navigation elements guide users through the application structure.",
    "Data display components present information in organized formats.",
    "Form inputs capture user data with built-in validation states.",
    "Surface containers group related content with visual hierarchy.",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Accordion */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Accordion</span>
        </div>
        <div style={{ padding: "16px" }}>
          <Accordion items={faqItems} defaultOpen={[0]} />
        </div>
      </div>

      {/* ScrollArea */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Scroll Area</span>
        </div>
        <div style={{ padding: "16px" }}>
          <ScrollArea maxHeight={200}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "8px 4px" }}>
              {scrollContent.map((text, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    fontFamily: "var(--font-mono)",
                    color: "#007AFF",
                    flexShrink: 0,
                    minWidth: "20px",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: textColor,
                    fontFamily: "var(--font-body)",
                  }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
