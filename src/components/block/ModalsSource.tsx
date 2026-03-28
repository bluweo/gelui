import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

import IMPL_MODAL from "@/primitives/feedback/Modal.tsx?raw";
import IMPL_OVERLAY from "@/primitives/feedback/Overlay.tsx?raw";
import IMPL_DRAGGABLE from "@/components/hooks/useDraggableModal.ts?raw";

const SOURCE_CODE = `import { createPortal } from "react-dom";
import { useDraggableModal } from "@/components/hooks/useDraggableModal";

function MyModal({ open, onClose, title, children }) {
  const { panelRef, panelStyle, backdropDragged, onDragStart } =
    useDraggableModal({ isOpen: open, onClose });

  if (!open) return null;

  return createPortal(
    <div
      className={\`fixed inset-0 z-[900] bg-black/20 backdrop-blur-[var(--glass-blur-overlay)]
        flex items-center justify-center p-5
        \${backdropDragged ? "items-start justify-start p-0" : ""}\`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="glass-panel max-w-[92vw] max-h-[calc(100vh-40px)]
          cursor-grab active:cursor-grabbing flex flex-col
          animate-panel-enter"
        style={{ ...panelStyle, width: "min(460px, 92vw)" }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onDragStart}
      >
        {/* Header — draggable area */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <span className="text-sm font-semibold">{title}</span>
          <button onClick={onClose} onMouseDown={(e) => e.stopPropagation()}>
            &times;
          </button>
        </div>

        {/* Body — stop drag propagation for interactive content */}
        <div className="px-5 pb-5" onMouseDown={(e) => e.stopPropagation()}>
          {children}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="solid" onClick={onClose}>Save</Button>
        </div>
      </div>
    </div>,
    document.body
  );
}`;

const COMPONENTS = [
  {
    name: "useDraggableModal",
    path: "@/components/hooks",
    description: "Shared hook for all draggable glass-panel modals. Handles mouse drag, viewport clamping, resize re-clamp, Escape key, and position reset on re-open.",
    implementation: IMPL_DRAGGABLE,
    props: [
      { name: "isOpen", type: "boolean", default: "false" },
      { name: "onClose", type: "() => void" },
      { name: "edgePadding", type: "number", default: "40" },
    ],
  },
  {
    name: "Modal",
    path: "@/primitives/feedback",
    description: "Simple centered modal primitive with Overlay backdrop. For basic use cases without dragging.",
    implementation: IMPL_MODAL,
    props: [
      { name: "open", type: "boolean", default: "false" },
      { name: "onClose", type: "() => void" },
      { name: "title", type: "string" },
      { name: "children", type: "ReactNode" },
      { name: "footer", type: "ReactNode" },
      { name: "size", type: "enum", options: ["sm", "md", "lg"], default: '"md"' },
    ],
  },
  {
    name: "Overlay",
    path: "@/primitives/feedback",
    description: "Backdrop overlay with blur and opacity. Used by Modal internally.",
    implementation: IMPL_OVERLAY,
    props: [
      { name: "open", type: "boolean", default: "false" },
      { name: "onClick", type: "() => void" },
      { name: "blur", type: "boolean", default: "false" },
    ],
  },
  { name: "glass-panel", path: "CSS class", description: "Glass morphism panel with backdrop blur, translucent background, border, and shadow. Used as the modal container." },
  { name: "animate-panel-enter", path: "CSS class", description: "Entry animation: scale from 0.96 + fade in over 200ms" },
  { name: "animate-backdrop-fade-in", path: "CSS class", description: "Backdrop fade-in animation over 200ms" },
];

export function ModalsSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="modals"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Modals" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
