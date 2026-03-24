/* ═══════════════════════════════════════════════
   GEL UI — DSL Renderer
   Recursively renders a JSON DSL tree into React components.
   Resolves each "type" to a component from the primitive map.
   ═══════════════════════════════════════════════ */
import { type ReactNode } from "react";
import { PRIMITIVE_MAP } from "./primitives";
import type { DSLNode } from "@/registry/types";

interface DSLRendererProps {
  node: DSLNode;
  depth?: number;
}

/** Recursively render a DSL node tree */
export function DSLRenderer({ node, depth = 0 }: DSLRendererProps): ReactNode {
  // Safety: max depth to prevent infinite recursion
  if (depth > 20) {
    return <div style={{ color: "red", fontSize: "12px" }}>⚠ Max depth exceeded</div>;
  }

  // Resolve component from primitive map
  const Component = PRIMITIVE_MAP[node.type];

  if (!Component) {
    return (
      <div
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          background: "rgba(255,59,48,0.1)",
          border: "1px solid rgba(255,59,48,0.2)",
          color: "#FF3B30",
          fontSize: "12px",
          fontFamily: "var(--font-mono)",
        }}
      >
        ⚠ Unknown component: <strong>{node.type}</strong>
      </div>
    );
  }

  // Resolve children
  let resolvedChildren: ReactNode = null;

  if (typeof node.children === "string") {
    // Plain text children
    resolvedChildren = node.children;
  } else if (Array.isArray(node.children)) {
    // Recursive child nodes
    resolvedChildren = node.children.map((child, i) => (
      <DSLRenderer key={child.key || `${node.type}-child-${i}`} node={child} depth={depth + 1} />
    ));
  }

  // Spread props (excluding reserved keys)
  const { type, children, key, slot, ...props } = node as DSLNode & Record<string, unknown>;
  const componentProps = node.props ?? {};

  return <Component {...componentProps}>{resolvedChildren}</Component>;
}

/** Render a full DSL document (wrapper for convenience) */
export function DSLDocument({ dsl, className = "" }: { dsl: DSLNode; className?: string }) {
  return (
    <div className={className}>
      <DSLRenderer node={dsl} />
    </div>
  );
}

/* ─── Example DSL for testing ─── */
export const EXAMPLE_DSL: DSLNode = {
  type: "card",
  props: { variant: "glass", frost: "standard" },
  children: [
    {
      type: "stack",
      props: { gap: "16px" },
      children: [
        { type: "heading", props: { level: 2 }, children: "Welcome to Gel UI" },
        { type: "text", children: "A glassmorphism-first design system with volumetric gel surfaces." },
        { type: "divider", props: { variant: "gradient" } },
        {
          type: "inline",
          props: { gap: "12px" },
          children: [
            { type: "button", props: { variant: "solid", size: "md" }, children: "Get Started" },
            { type: "button", props: { variant: "ghost", size: "md" }, children: "Learn More" },
          ],
        },
        {
          type: "inline",
          props: { gap: "8px" },
          children: [
            { type: "badge", props: { variant: "success" }, children: "Stable" },
            { type: "badge", props: { variant: "info" }, children: "v0.9" },
            { type: "badge", children: "Astro 5" },
          ],
        },
      ],
    },
  ],
};

export const LOGIN_CARD_DSL: DSLNode = {
  type: "card",
  props: { variant: "glass", frost: "standard" },
  children: [
    {
      type: "stack",
      props: { gap: "20px" },
      children: [
        {
          type: "center",
          children: [
            { type: "avatar", props: { name: "Gel UI", size: "56px" } },
          ],
        },
        { type: "heading", props: { level: 3 }, children: "Sign In" },
        { type: "text", props: { size: "13px" }, children: "Enter your credentials to continue" },
        {
          type: "stack",
          props: { gap: "12px" },
          children: [
            { type: "input", props: { placeholder: "Email address", type: "email" } },
            { type: "input", props: { placeholder: "Password", type: "password" } },
          ],
        },
        {
          type: "inline",
          props: { gap: "12px" },
          children: [
            { type: "checkbox", props: { checked: true } },
            { type: "text", props: { size: "12px" }, children: "Remember me" },
          ],
        },
        { type: "button", props: { variant: "solid", size: "lg" }, children: "Sign In" },
        {
          type: "center",
          children: [
            { type: "link", children: "Forgot password?" },
          ],
        },
      ],
    },
  ],
};

export const DASHBOARD_WIDGET_DSL: DSLNode = {
  type: "card",
  props: { variant: "glass", frost: "haze" },
  children: [
    {
      type: "stack",
      props: { gap: "16px" },
      children: [
        {
          type: "inline",
          props: { gap: "12px" },
          children: [
            { type: "avatar", props: { name: "John Doe", size: "40px" } },
            {
              type: "stack",
              props: { gap: "2px" },
              children: [
                { type: "text", props: { size: "14px", weight: 600 }, children: "John Doe" },
                { type: "caption", children: "Product Designer" },
              ],
            },
            { type: "badge", props: { variant: "success" }, children: "Online" },
          ],
        },
        { type: "divider", props: { variant: "gradient" } },
        {
          type: "grid",
          props: { cols: 3, gap: "12px" },
          children: [
            {
              type: "stack",
              props: { gap: "4px" },
              children: [
                { type: "heading", props: { level: 4 }, children: "128" },
                { type: "caption", children: "Components" },
              ],
            },
            {
              type: "stack",
              props: { gap: "4px" },
              children: [
                { type: "heading", props: { level: 4 }, children: "24" },
                { type: "caption", children: "Patterns" },
              ],
            },
            {
              type: "stack",
              props: { gap: "4px" },
              children: [
                { type: "heading", props: { level: 4 }, children: "6" },
                { type: "caption", children: "Layouts" },
              ],
            },
          ],
        },
        {
          type: "stack",
          props: { gap: "8px" },
          children: [
            { type: "label", children: "Project Progress" },
            { type: "progress", props: { value: 72 } },
            { type: "caption", children: "72% complete — 3 tasks remaining" },
          ],
        },
      ],
    },
  ],
};

/** All example DSLs */
export const DSL_EXAMPLES: { id: string; name: string; description: string; dsl: DSLNode }[] = [
  { id: "welcome", name: "Welcome Card", description: "Basic card with heading, text, and actions", dsl: EXAMPLE_DSL },
  { id: "login", name: "Login Form", description: "Authentication card with inputs and actions", dsl: LOGIN_CARD_DSL },
  { id: "dashboard", name: "Dashboard Widget", description: "User profile card with stats and progress", dsl: DASHBOARD_WIDGET_DSL },
];
