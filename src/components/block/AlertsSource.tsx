import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_ALERT from "@/primitives/feedback/Alert.tsx?raw";
import IMPL_TOAST from "@/primitives/feedback/Toast.tsx?raw";

const SOURCE_CODE = `import { Alert } from "@/primitives/feedback";
import { Toast } from "@/primitives/feedback";

{/* Alert variants */}
<Alert variant="info" title="Information" description="Anyone with a link can now view this file." />
<Alert variant="success" title="Success" description="Anyone with a link can now view this file." />
<Alert variant="warning" title="Warning" description="Anyone with a link can now view this file." />
<Alert variant="error" title="Error" description="Anyone with a link can now view this file." />

{/* Dismissible alert */}
<Alert variant="warning" title="Warning" description="Can be dismissed." dismissible onDismiss={() => {}} />

{/* Toast notification */}
<Toast
  variant="info"
  message="This is an info notification."
  show={showToast}
  onClose={() => setShowToast(false)}
  duration={3000}
/>

{/* Trigger toast */}
<button onClick={() => setShowToast(true)}>Show Toast</button>`;

const COMPONENTS = [
  {
    name: "Alert",
    path: "@/primitives/feedback",
    description: "Status alert with icon container, title, description. Glass-style card with left gradient glow and color bar.",
    implementation: IMPL_ALERT,
    props: [
      { name: "variant", type: "enum", options: ["info", "success", "warning", "error"], default: '"info"' },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "dismissible", type: "boolean", default: "false" },
      { name: "onDismiss", type: "() => void" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "Toast",
    path: "@/primitives/feedback",
    description: "Temporary notification popup. Fixed bottom-right with slide-in animation. Left gradient glow + color bar. Auto-dismisses after duration.",
    implementation: IMPL_TOAST,
    props: [
      { name: "variant", type: "enum", options: ["info", "success", "warning", "error"], default: '"info"' },
      { name: "message", type: "string", default: "—" },
      { name: "show", type: "boolean", default: "false" },
      { name: "onClose", type: "() => void" },
      { name: "duration", type: "number", default: "3000" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
];

export function AlertsSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="alerts"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal
      open={open}
      onClose={() => setOpen(false)}
      title="Alerts & Toasts"
      code={SOURCE_CODE}
      components={COMPONENTS}
    />
  );
}
