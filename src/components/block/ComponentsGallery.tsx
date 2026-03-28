import { useState, type ReactNode } from "react";
import registryData from "@/registry/registry.json";
import { componentMap } from "@/components/composed/componentMap";

/* ─────────────────────────────────────────────── */
/* Build component list from registry + map        */
/* ─────────────────────────────────────────────── */

interface CompCard {
  id: string;
  name: string;
  description: string;
  category: string;
  skeleton: () => ReactNode;
}

const COMPONENTS: CompCard[] = registryData.components
  .filter((c: any) => c.layer === "component" && c.status === "stable" && componentMap[c.id])
  .map((c: any) => ({
    id: c.id,
    name: c.exportName || c.name,
    description: c.description || "",
    category: c.category || "Other",
    skeleton: componentMap[c.id].skeleton,
  }));

const CATEGORIES = ["All", ...Array.from(new Set(COMPONENTS.map((c) => c.category)))].sort((a, b) => {
  if (a === "All") return -1;
  if (b === "All") return 1;
  return a.localeCompare(b);
});

/* ─────────────────────────────────────────────── */
/* Component Card                                  */
/* ─────────────────────────────────────────────── */

function ComponentCard({ comp }: { comp: CompCard }) {
  return (
    <a
      href={`/design-system/components/${comp.id}`}
      className="block text-left w-full rounded-[var(--glass-radius)] bg-white dark:bg-[#1a1a1a] border border-[var(--theme-divider)] overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-[var(--theme-fg-subtle)] no-underline"
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
    </a>
  );
}

/* ─────────────────────────────────────────────── */
/* Gallery (exported)                              */
/* ─────────────────────────────────────────────── */

export function ComponentsGallery() {
  const [category, setCategory] = useState("All");

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
            <ComponentCard key={comp.id} comp={comp} />
          ))}
        </div>
      </div>
    </div>
  );
}
