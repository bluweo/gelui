/* Wrapper that lazy-loads NodeEditor to avoid SSR issues with React Flow */
import { lazy, Suspense } from "react";

const NodeEditor = lazy(() => import("./NodeEditor").then(m => ({ default: m.NodeEditor })));

export function NodeEditorWrapper() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px", opacity: 0.4, fontSize: "13px" }}>
        Loading Node Editor...
      </div>
    }>
      <NodeEditor />
    </Suspense>
  );
}
