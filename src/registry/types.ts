/* ═══════════════════════════════════════════════
   COMPONENT REGISTRY — TypeScript Types
   Single source of truth for all Gel UI components.
   Used by: Node Editor, DSL Renderer, Component Docs
   ═══════════════════════════════════════════════ */

/** Architecture layers (bottom → top) */
export type Layer = "core" | "token" | "primitive" | "component" | "pattern" | "layout";

/** Functional categories */
export type Category =
  | "typography"
  | "interactive"
  | "surface"
  | "form"
  | "feedback"
  | "navigation"
  | "layout"
  | "data"
  | "overlay"
  | "media"
  | "color"
  | "spacing"
  | "motion"
  | "glass";

/** Component maturity */
export type Status = "stable" | "beta" | "experimental" | "deprecated" | "planned";

/** Prop types for schema definition */
export type PropType = "string" | "number" | "boolean" | "enum" | "color" | "size" | "node" | "children";

/** Individual prop schema */
export interface PropSchema {
  type: PropType;
  required?: boolean;
  default?: string | number | boolean;
  options?: string[];          // For enum type
  min?: number;                // For number type
  max?: number;
  description?: string;
}

/** Slot schema — defines what children a component accepts */
export interface SlotSchema {
  accepts: string[];           // Component IDs that can go in this slot
  multiple?: boolean;          // Can contain multiple children?
  required?: boolean;
}

/** Single component registry entry */
export interface ComponentRegistryEntry {
  // ── Identity ──
  id: string;                  // Unique kebab-case ID: "gel-button"
  name: string;                // Short name: "Button"
  displayName: string;         // Full display name: "Gel Button"
  description: string;         // One-line description

  // ── Classification ──
  layer: Layer;
  category: Category;
  status: Status;
  version: string;             // Semver when added/updated

  // ── Source ──
  path: string;                // File path relative to src/
  exportName?: string;         // Named export (if React): "GelButton"
  isReact: boolean;            // true = React island, false = Astro/CSS-only

  // ── Props ──
  props: Record<string, PropSchema>;

  // ── Composition ──
  slots?: Record<string, SlotSchema>;
  composedOf?: string[];       // IDs of smaller components this is built from

  // ── Documentation ──
  documentedOn: string;        // Page path: "/design-system/primitives"
  section?: string;            // Section on that page: "Buttons"
  tags: string[];              // Search/filter tags

  // ── Node Editor ──
  nodeColor?: string;          // Hex color for the node in canvas
  nodeIcon?: string;           // Icon identifier
}

/** Pre-built composition template */
export interface CompositionEntry {
  id: string;
  name: string;
  displayName: string;
  description: string;
  layer: Layer;
  composedOf: string[];        // Component IDs used in this composition
  dsl: DSLNode;                // The JSON DSL definition
  thumbnail?: string;
  tags: string[];
}

/** DSL Node — the JSON format for defining UI */
export interface DSLNode {
  type: string;                // Component registry ID
  props?: Record<string, unknown>;
  children?: DSLNode[] | string;
  slot?: string;               // Which slot to place into (if parent has named slots)
  key?: string;                // Unique key for lists
}

/** Full registry file structure */
export interface Registry {
  version: string;
  lastUpdated: string;
  components: ComponentRegistryEntry[];
}

/** Full compositions file structure */
export interface CompositionsFile {
  version: string;
  compositions: CompositionEntry[];
}

/* ── Layer metadata (for UI display) ── */
export const LAYER_META: Record<Layer, { label: string; order: number; color: string; description: string }> = {
  core:      { label: "Core",       order: 1, color: "#6B7280", description: "CSS reset, variables, Tailwind v4" },
  token:     { label: "Token",      order: 2, color: "#FFC800", description: "Colors, typography, spacing, glass" },
  primitive: { label: "Primitive",  order: 3, color: "#354334", description: "Single-purpose building blocks" },
  component: { label: "Component",  order: 4, color: "#4A5E48", description: "Multi-primitive compositions" },
  pattern:   { label: "Pattern",    order: 5, color: "#7B9779", description: "Recurring UI patterns & flows" },
  layout:    { label: "Layout",     order: 6, color: "#97AD96", description: "Page grids, shells, composition" },
};

export const CATEGORY_META: Record<Category, { label: string; icon: string }> = {
  typography:   { label: "Typography",   icon: "type" },
  interactive:  { label: "Interactive",  icon: "pointer" },
  surface:      { label: "Surface",      icon: "layers" },
  form:         { label: "Form",         icon: "input" },
  feedback:     { label: "Feedback",     icon: "bell" },
  navigation:   { label: "Navigation",   icon: "compass" },
  layout:       { label: "Layout",       icon: "grid" },
  data:         { label: "Data",         icon: "table" },
  overlay:      { label: "Overlay",      icon: "maximize" },
  media:        { label: "Media",        icon: "image" },
  color:        { label: "Color",        icon: "palette" },
  spacing:      { label: "Spacing",      icon: "move" },
  motion:       { label: "Motion",       icon: "zap" },
  glass:        { label: "Glass",        icon: "droplet" },
};
