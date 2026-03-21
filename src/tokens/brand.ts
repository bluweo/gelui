/**
 * Brand color definitions — SSOT for the brand identity.
 *
 * Each entry defines a brand color extracted from the logo or chosen manually.
 * The tokens page reads this array to render an adaptive layout.
 */

export interface BrandColor {
  /** Kebab-safe key used in CSS var names, e.g. "blue" → --color-raw-blue-500 */
  key: string;
  /** Base hex color, e.g. "#3700FF" */
  hex: string;
  /** Human-readable label for display, e.g. "Primary" */
  label: string;
  /** Semantic role hint (optional) */
  role?: "primary" | "secondary" | "accent";
}

export const brand: BrandColor[] = [
  { key: "blue", hex: "#3700FF", label: "Primary", role: "primary" },
  { key: "gold", hex: "#F2C215", label: "Gold Accent", role: "accent" },
];
