import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

import IMPL_CARD from "@/primitives/surfaces/Card.tsx?raw";

const SOURCE_CODE = `{/* Shadow elevation levels via CSS classes */}

{/* Flat — no shadow (z-0) */}
<div className="elevation-flat rounded-xl p-4">
  No elevation
</div>

{/* Raised — subtle shadow for dropdowns (z-100) */}
<div className="elevation-raised rounded-xl p-4">
  Dropdowns
</div>

{/* Floating — medium shadow for popovers (z-300) */}
<div className="elevation-floating rounded-xl p-4">
  Popovers
</div>

{/* Modal — strong shadow for dialogs (z-400) */}
<div className="elevation-modal rounded-xl p-4">
  Dialogs
</div>

{/* Top — strongest shadow for tooltips (z-600) */}
<div className="elevation-top rounded-xl p-4">
  Tooltips
</div>`;

const COMPONENTS = [
  {
    name: "Card",
    path: "@/primitives/surfaces",
    description: "Glass card container. Elevation is applied via CSS shadow utility classes.",
    implementation: IMPL_CARD,
    props: [
      { name: "variant", type: "enum", options: ["glass", "solid", "transparent", "gel-glass"], default: '"glass"' },
      { name: "frost", type: "enum", options: ["standard", "haze", "directional", "none"], default: '"standard"' },
      { name: "className", type: "string" },
      { name: "children", type: "ReactNode" },
    ],
  },
  { name: "elevation-flat", path: "CSS class", description: "No shadow — z-index 0. For flat, grounded elements." },
  { name: "elevation-raised", path: "CSS class", description: "Subtle shadow — z-index 100. For dropdowns, tooltips." },
  { name: "elevation-floating", path: "CSS class", description: "Medium shadow — z-index 300. For popovers, floating panels." },
  { name: "elevation-modal", path: "CSS class", description: "Strong shadow — z-index 400. For modals, dialogs." },
  { name: "elevation-top", path: "CSS class", description: "Strongest shadow — z-index 600. For tooltips, top-level overlays." },
];

export function ElevationSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="elevation"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Elevation" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
