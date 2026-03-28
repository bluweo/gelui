import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

import IMPL_SPINNER from "@/primitives/feedback/Spinner.tsx?raw";
import IMPL_PROGRESS from "@/primitives/feedback/Progress.tsx?raw";
import IMPL_SKELETON from "@/primitives/feedback/Skeleton.tsx?raw";

const SOURCE_CODE = `import { Spinner, Progress, Skeleton } from "@/primitives/feedback";

{/* Spinner — loading indicator */}
<Spinner size="16px" />
<Spinner size="24px" />
<Spinner size="32px" />

{/* Progress bar */}
<Progress value={67} />

{/* Skeleton — loading placeholder */}
{/* Card loading */}
<div className="flex gap-3">
  <Skeleton width="48px" height="48px" rounded="50%" />
  <div className="flex-1 flex flex-col gap-2">
    <Skeleton width="60%" height="14px" />
    <Skeleton width="100%" height="10px" />
    <Skeleton width="80%" height="10px" />
  </div>
</div>

{/* List loading */}
<div className="flex gap-2.5 items-center">
  <Skeleton width="32px" height="32px" rounded="8px" />
  <div className="flex-1 flex flex-col gap-1">
    <Skeleton width="60%" height="12px" />
    <Skeleton width="45%" height="9px" />
  </div>
</div>

{/* Text block */}
<Skeleton width="40%" height="18px" />
<Skeleton width="100%" height="10px" />
<Skeleton width="95%" height="10px" />
<Skeleton width="70%" height="10px" />`;

const COMPONENTS = [
  {
    name: "Spinner",
    path: "@/primitives/feedback",
    description: "Animated loading spinner. Border width scales with size to match Progress bar weight.",
    implementation: IMPL_SPINNER,
    props: [
      { name: "size", type: "string", default: '"24px"' },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "Progress",
    path: "@/primitives/feedback",
    description: "Horizontal progress bar with animated fill. 6px track height.",
    implementation: IMPL_PROGRESS,
    props: [
      { name: "value", type: "number", default: "60" },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
  {
    name: "Skeleton",
    path: "@/primitives/feedback",
    description: "Shimmer loading placeholder for content. Supports custom width, height, and border radius.",
    implementation: IMPL_SKELETON,
    props: [
      { name: "width", type: "string", default: '"100%"' },
      { name: "height", type: "string", default: '"16px"' },
      { name: "rounded", type: "string", default: '"4px"' },
      { name: "className", type: "string" },
      { name: "style", type: "CSSProperties" },
    ],
  },
];

export function FeedbackSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="feedback"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Feedback" code={SOURCE_CODE} components={COMPONENTS} />
  );
}
