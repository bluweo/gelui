import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

import IMPL_PAGINATION from "@/primitives/navigation/Pagination.tsx?raw";
import IMPL_STEPPER from "@/primitives/navigation/Stepper.tsx?raw";
import IMPL_BACKTOTOP from "@/primitives/navigation/BackToTop.tsx?raw";

const SOURCE_CODE = `import { Pagination, Stepper, BackToTop } from "@/primitives/navigation";

{/* Pagination — icon-only prev/next with hover invert */}
<Pagination
  totalPages={10}
  currentPage={page}
  onPageChange={setPage}
/>

{/* Horizontal Stepper */}
<Stepper
  steps={["Account", "Profile", "Settings", "Review"]}
  currentStep={step}
  onChange={setStep}
/>

{/* Vertical Stepper with descriptions */}
<Stepper
  steps={[
    { label: "Account", description: "Create your account credentials" },
    { label: "Profile", description: "Add your personal information" },
    { label: "Settings", description: "Configure your preferences" },
    { label: "Review", description: "Confirm and submit" },
  ]}
  currentStep={step}
  onChange={setStep}
  direction="vertical"
/>

{/* Back to Top — floating button, appears on scroll */}
<BackToTop threshold={400} smooth />`;

const COMPONENTS = [
  {
    name: "Pagination",
    path: "@/primitives/navigation",
    description: "Page navigation with icon-only prev/next arrows. Hover inverts to solid color and scales up.",
    implementation: IMPL_PAGINATION,
    props: [
      { name: "totalPages", type: "number" },
      { name: "currentPage", type: "number" },
      { name: "onPageChange", type: "(page: number) => void" },
      { name: "maxVisible", type: "number", default: "5" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "Stepper",
    path: "@/primitives/navigation",
    description: "Multi-step wizard indicator. Supports horizontal and vertical layout, string or { label, description } steps.",
    implementation: IMPL_STEPPER,
    props: [
      { name: "steps", type: 'string[] | { label, description }[]' },
      { name: "currentStep", type: "number" },
      { name: "onChange", type: "(step: number) => void" },
      { name: "direction", type: "enum", options: ["horizontal", "vertical"], default: '"horizontal"' },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "BackToTop",
    path: "@/primitives/navigation",
    description: "Floating scroll-to-top button. Appears after scrolling past threshold. Contrast-aware via useContrastColor hook.",
    implementation: IMPL_BACKTOTOP,
    props: [
      { name: "threshold", type: "number", default: "400" },
      { name: "smooth", type: "boolean", default: "true" },
      { name: "className", type: "string" },
    ],
  },
];

export function NavigationExtrasSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="navigation-extras"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Navigation Extras" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
