import { useState } from "react";
import { componentMap } from "@/components/composed/componentMap";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

interface ComponentPreviewProps {
  id: string;
  name: string;
  description: string;
  importPath: string;
  exportName: string;
  props: { name: string; type: string; default?: string }[];
  examples: { title: string; jsx: string }[];
}

export function ComponentPreview({
  id,
  name,
  description,
  importPath,
  exportName,
  props,
  examples,
}: ComponentPreviewProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showSource, setShowSource] = useState(false);

  const map = componentMap[id];
  if (!map) return <div className="p-8 text-center text-[var(--theme-fg-muted)]">Preview not available</div>;

  const viewportWidth = viewport === "mobile" ? "375px" : viewport === "tablet" ? "768px" : "100%";

  const sourceComponents = [{
    name,
    path: importPath,
    description,
    implementation: map.implementation,
    props: props.map(p => ({ name: p.name, type: p.type, default: p.default })),
  }];

  const sourceCode = `import { ${exportName} } from "${importPath}";\n\n${examples.map(e => e.jsx).join("\n")}`;

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-end gap-2 mb-4">
        {(["mobile", "tablet", "desktop"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setViewport(v)}
            className={`w-8 h-8 rounded-[var(--glass-radius-sm)] flex items-center justify-center transition-colors ${
              viewport === v
                ? "bg-[var(--theme-fg)] text-white dark:text-black"
                : "bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:text-[var(--theme-fg)]"
            }`}
            title={v}
          >
            {v === "mobile" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>}
            {v === "tablet" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>}
            {v === "desktop" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
          </button>
        ))}
        <button
          onClick={() => setShowSource(true)}
          className="w-8 h-8 rounded-[var(--glass-radius-sm)] flex items-center justify-center bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:text-[var(--theme-fg)] transition-colors"
          title="View Source"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </button>
      </div>

      {/* Preview */}
      <div className="bg-[var(--theme-header-bg)] rounded-[var(--glass-radius)] p-6 flex items-center justify-center min-h-[300px]">
        <div className="transition-all duration-300 w-full overflow-x-auto" style={{ maxWidth: viewportWidth }}>
          <div className="bg-white dark:bg-[#1a1a1a] rounded-[var(--glass-radius-sm)] p-6 border border-[var(--theme-divider)]">
            {map.preview()}
          </div>
        </div>
      </div>

      {/* Source modal */}
      {showSource && (
        <ViewSourceModal
          open={showSource}
          onClose={() => setShowSource(false)}
          title={name}
          code={sourceCode}
          components={sourceComponents}
        />
      )}
    </>
  );
}
