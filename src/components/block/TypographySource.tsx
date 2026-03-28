import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

import IMPL_TYPEPRESETS from "@/components/block/TypePresetsTable.tsx?raw";

const SOURCE_CODE = `{/* Typography uses CSS classes — not React components */}
{/* All type presets use calc(size * var(--type-scale)) for responsive scaling */}

{/* Headings */}
<h1 className="type-h1">Heading 1</h1>
<h2 className="type-h2">Heading 2</h2>
<h3 className="type-h3">Heading 3</h3>
<h4 className="type-h4">Heading 4</h4>

{/* Display (larger headings) */}
<h1 className="type-display">Display</h1>

{/* Body text */}
<p className="type-body">Body text — 15px, 400 weight</p>
<p className="type-body-sm">Body small — 13px, 400 weight</p>

{/* UI labels */}
<span className="type-label">Label — 12px, 600 weight</span>
<span className="type-overline">Overline — 10px, 650 weight, uppercase</span>
<figcaption className="type-caption">Caption — 11px, 400 weight</figcaption>

{/* Code */}
<code className="type-code">Code — 13px, mono font</code>
<code className="type-code-sm">Code Small — 11px, mono font</code>

{/* Links */}
<a className="type-link">Link — 15px, 550 weight</a>

{/* Font families set via CSS variables */}
{/* --font-heading, --font-body, --font-ui, --font-mono */}

{/* Type scale — set globally via --type-scale CSS variable */}
{/* small: 0.82, medium: 1.0, large: 1.22 */}`;

const COMPONENTS = [
  {
    name: "TypePresetsTable",
    path: "@/components/block",
    description: "Interactive table showing all 14 type presets with live samples, sizes, and weights. Includes preset size selector (small/medium/large).",
    implementation: IMPL_TYPEPRESETS,
    props: [],
  },
  { name: "type-h1", path: "CSS class", description: "Heading 1 — 30px × --type-scale, weight 700, --font-heading" },
  { name: "type-h2", path: "CSS class", description: "Heading 2 — 22px × --type-scale, weight 700, --font-heading" },
  { name: "type-h3", path: "CSS class", description: "Heading 3 — 18px × --type-scale, weight 650, --font-heading" },
  { name: "type-h4", path: "CSS class", description: "Heading 4 — 15px × --type-scale, weight 600, --font-heading" },
  { name: "type-display", path: "CSS class", description: "Display — 40px × --type-scale, weight 750, --font-heading" },
  { name: "type-body", path: "CSS class", description: "Body — 15px × --type-scale, weight 400, --font-body" },
  { name: "type-body-sm", path: "CSS class", description: "Body Small — 13px × --type-scale, weight 400, --font-body" },
  { name: "type-label", path: "CSS class", description: "Label — 12px × --type-scale, weight 600, --font-ui" },
  { name: "type-overline", path: "CSS class", description: "Overline — 10px × --type-scale, weight 650, uppercase, --font-ui" },
  { name: "type-caption", path: "CSS class", description: "Caption — 11px × --type-scale, weight 400, --font-body" },
  { name: "type-code", path: "CSS class", description: "Code — 13px × --type-scale, weight 500, --font-mono" },
  { name: "type-code-sm", path: "CSS class", description: "Code Small — 11px × --type-scale, weight 500, --font-mono" },
  { name: "type-link", path: "CSS class", description: "Link — 15px × --type-scale, weight 550, --font-body" },
];

export function TypographySource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="typography"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Typography" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
