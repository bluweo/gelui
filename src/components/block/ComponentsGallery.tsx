import { useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import registryData from "@/registry/registry.json";
import { componentMap } from "@/components/composed/componentMap";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

/* ─────────────────────────────────────────────── */
/* Build component list from registry + map        */
/* ─────────────────────────────────────────────── */

interface CompDef {
  id: string;
  name: string;
  description: string;
  category: string;
  importPath: string;
  exportName: string;
  usedPrimitives: string[];
  useWhen: string[];
  avoidWhen: string[];
  examples: { title: string; jsx: string }[];
  props: { name: string; type: string; default?: string }[];
  preview: () => ReactNode;
  skeleton: () => ReactNode;
  implementation: string;
}

const COMPONENTS: CompDef[] = registryData.components
  .filter((c: any) => c.layer === "component" && c.status === "stable" && componentMap[c.id])
  .map((c: any) => {
    const map = componentMap[c.id];
    return {
      id: c.id,
      name: c.exportName || c.name,
      description: c.description || "",
      category: c.category || "Other",
      importPath: c.importPath || "",
      exportName: c.exportName || c.name,
      usedPrimitives: c.composition?.usedPrimitives || [],
      useWhen: c.ai?.useWhen || [],
      avoidWhen: c.ai?.avoidWhen || [],
      examples: c.examples || [],
      props: c.props ? Object.entries(c.props).map(([name, p]: [string, any]) => ({
        name,
        type: p.type || "string",
        default: p.default,
      })) : [],
      preview: map.preview,
      skeleton: map.skeleton,
      implementation: map.implementation,
    };
  });

const CATEGORIES = ["All", ...Array.from(new Set(COMPONENTS.map((c) => c.category)))].sort((a, b) => {
  if (a === "All") return -1;
  if (b === "All") return 1;
  return a.localeCompare(b);
});

/* ─────────────────────────────────────────────── */
/* Component Card                                  */
/* ─────────────────────────────────────────────── */

function ComponentCard({ comp, onClick }: { comp: CompDef; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left w-full rounded-[var(--glass-radius)] bg-white dark:bg-[#1a1a1a] border border-[var(--theme-divider)] overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-[var(--theme-fg-subtle)] cursor-pointer"
    >
      <div className="p-4 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)] min-h-[120px] flex items-center justify-center">
        <div className="w-full max-w-[280px] opacity-50">
          {comp.skeleton()}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[14px] font-[600] text-[var(--theme-fg)]" style={{ fontFamily: "var(--font-heading)" }}>
            {comp.name}
          </span>
          <span className="text-[10px] font-[500] uppercase tracking-[0.04em] px-1.5 py-0.5 rounded-full bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)]">
            {comp.category}
          </span>
        </div>
        <p className="text-[12px] text-[var(--theme-fg-muted)] leading-[1.4]" style={{ fontFamily: "var(--font-body)" }}>
          {comp.description}
        </p>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────── */
/* Detail Modal                                    */
/* ─────────────────────────────────────────────── */

function DetailModal({ comp, onClose }: { comp: CompDef; onClose: () => void }) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    const slug = `/design-system/components/${comp.id}`;
    window.history.pushState({}, "", slug);
    return () => { window.history.pushState({}, "", "/design-system/components"); };
  }, [comp.id]);

  const viewportWidth = viewport === "mobile" ? "375px" : viewport === "tablet" ? "768px" : "100%";

  const sourceComponents = [{
    name: comp.name,
    path: comp.importPath,
    description: comp.description,
    implementation: comp.implementation,
    props: comp.props.map(p => ({ name: p.name, type: p.type, default: p.default })),
  }];

  const sourceCode = `import { ${comp.exportName} } from "${comp.importPath}";\n\n${comp.examples.map(e => e.jsx).join("\n")}`;

  return createPortal(
    <div className="fixed inset-0 z-[500] flex items-start justify-center overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[1000px] my-8 mx-4 rounded-[var(--glass-radius)] bg-white dark:bg-[#1a1a1a] border border-[var(--theme-divider)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--theme-divider)]">
          <div>
            <h2 className="text-[20px] font-[700] text-[var(--theme-fg)]" style={{ fontFamily: "var(--font-heading)" }}>
              {comp.name}
            </h2>
            <p className="text-[13px] text-[var(--theme-fg-muted)]" style={{ fontFamily: "var(--font-body)" }}>
              {comp.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(["mobile", "tablet", "desktop"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewport(v)}
                className={`w-8 h-8 rounded-[var(--glass-radius-sm)] flex items-center justify-center transition-colors ${
                  viewport === v ? "bg-[var(--theme-fg)] text-white dark:text-black" : "bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:text-[var(--theme-fg)]"
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
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-[var(--glass-radius-sm)] flex items-center justify-center bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:text-[var(--theme-fg)] transition-colors ml-2"
              title="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="p-6 bg-[var(--theme-header-bg)] min-h-[300px] flex items-center justify-center">
          <div className="transition-all duration-300 w-full overflow-x-auto" style={{ maxWidth: viewportWidth }}>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-[var(--glass-radius-sm)] p-6 border border-[var(--theme-divider)]">
              {comp.preview()}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="px-6 py-5 border-t border-[var(--theme-divider)]">
          <div className="grid grid-cols-2 gap-6 max-[540px]:grid-cols-1">
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-[var(--theme-fg-muted)] mb-2 block">Component Info</span>
                <div className="flex flex-col gap-1.5 text-[12px]" style={{ fontFamily: "var(--font-body)" }}>
                  <div className="flex gap-2"><span className="text-[var(--theme-fg-muted)] w-[60px]">ID</span><span className="text-[var(--theme-fg)] font-[550]">{comp.id}</span></div>
                  <div className="flex gap-2"><span className="text-[var(--theme-fg-muted)] w-[60px]">Slug</span><span className="text-[var(--theme-fg)]">/components/{comp.id}</span></div>
                  <div className="flex gap-2"><span className="text-[var(--theme-fg-muted)] w-[60px]">Layer</span><span className="text-[var(--theme-fg)]">Component</span></div>
                  <div className="flex gap-2"><span className="text-[var(--theme-fg-muted)] w-[60px]">Category</span><span className="text-[var(--theme-fg)]">{comp.category}</span></div>
                  <div className="flex gap-2"><span className="text-[var(--theme-fg-muted)] w-[60px]">Status</span><span className="text-green-600 font-[550]">Stable</span></div>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-[var(--theme-fg-muted)] mb-2 block">Import</span>
                <pre className="text-[11px] p-3 rounded-[var(--glass-radius-sm)] bg-[#1e1e1e] text-[#d4d4d4] overflow-x-auto" style={{ fontFamily: "var(--font-mono)" }}>
                  {`import { ${comp.exportName} } from "${comp.importPath}";`}
                </pre>
              </div>
              {comp.examples.length > 0 && (
                <div>
                  <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-[var(--theme-fg-muted)] mb-2 block">Usage</span>
                  <pre className="text-[11px] p-3 rounded-[var(--glass-radius-sm)] bg-[#1e1e1e] text-[#d4d4d4] overflow-x-auto" style={{ fontFamily: "var(--font-mono)" }}>
                    {comp.examples[0].jsx}
                  </pre>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {comp.usedPrimitives.length > 0 && (
                <div>
                  <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-[var(--theme-fg-muted)] mb-2 block">Based on Primitives</span>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.usedPrimitives.map((p) => (
                      <span key={p} className="text-[11px] font-[500] px-2 py-0.5 rounded-full bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] border border-[var(--theme-divider)]">{p}</span>
                    ))}
                  </div>
                </div>
              )}
              {comp.useWhen.length > 0 && (
                <div>
                  <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-green-600 mb-2 block">Use When</span>
                  <ul className="flex flex-col gap-1">
                    {comp.useWhen.map((u, i) => (
                      <li key={i} className="text-[12px] text-[var(--theme-fg-muted)] flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="w-1 h-1 rounded-full bg-green-500 shrink-0" />{u}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {comp.avoidWhen.length > 0 && (
                <div>
                  <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-red-500 mb-2 block">Avoid When</span>
                  <ul className="flex flex-col gap-1">
                    {comp.avoidWhen.map((a, i) => (
                      <li key={i} className="text-[12px] text-[var(--theme-fg-muted)] flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />{a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSource && (
        <ViewSourceModal
          open={showSource}
          onClose={() => setShowSource(false)}
          title={comp.name}
          code={sourceCode}
          components={sourceComponents}
        />
      )}
    </div>,
    document.body
  );
}

/* ─────────────────────────────────────────────── */
/* Gallery (exported)                              */
/* ─────────────────────────────────────────────── */

interface GalleryProps {
  initialSlug?: string;
}

export function ComponentsGallery({ initialSlug }: GalleryProps) {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<CompDef | null>(null);

  // Open component from initial slug (direct URL or [slug].astro)
  useEffect(() => {
    const slug = initialSlug || window.location.pathname.match(/\/design-system\/components\/(.+)/)?.[1];
    if (slug) {
      const comp = COMPONENTS.find((c) => c.id === slug);
      if (comp) setSelected(comp);
    }
  }, [initialSlug]);

  // Handle back button
  useEffect(() => {
    const handler = () => {
      const path = window.location.pathname;
      if (path === "/design-system/components" || path === "/design-system/components/") {
        setSelected(null);
      } else {
        const slug = path.match(/\/design-system\/components\/(.+)/)?.[1];
        if (slug) {
          const comp = COMPONENTS.find((c) => c.id === slug);
          setSelected(comp || null);
        }
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const filtered = category === "All" ? COMPONENTS : COMPONENTS.filter((c) => c.category === category);

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? COMPONENTS.length : COMPONENTS.filter((c) => c.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex gap-6 max-[860px]:flex-col">
      {/* Category sidebar */}
      <nav className="w-[180px] shrink-0 max-[860px]:w-full">
        <h3 className="text-[12px] font-[650] uppercase tracking-[0.06em] contrast-text mb-3" style={{ fontFamily: "var(--font-ui)" }}>
          Categories
        </h3>
        <div className="flex flex-col gap-0.5 max-[860px]:flex-row max-[860px]:flex-wrap max-[860px]:gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center justify-between px-3 py-2 rounded-[var(--glass-radius-sm)] text-left text-[13px] transition-colors max-[860px]:px-3 max-[860px]:py-1.5 ${
                category === cat
                  ? "bg-[var(--theme-fg)] text-white dark:text-black font-[600]"
                  : "contrast-text-muted hover:contrast-text hover:bg-white/10 dark:hover:bg-white/5"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>{cat}</span>
              <span className={`text-[11px] ${category === cat ? "opacity-70" : "opacity-40"}`}>
                {categoryCounts[cat]}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Cards grid */}
      <div className="flex-1 min-w-0">
        <div className="grid grid-cols-3 gap-4 max-[1100px]:grid-cols-2 max-[540px]:grid-cols-1">
          {filtered.map((comp) => (
            <ComponentCard key={comp.id} comp={comp} onClick={() => setSelected(comp)} />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selected && <DetailModal comp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
