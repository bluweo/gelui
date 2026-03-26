import { useState, useEffect, useCallback } from "react";
import { PresetEditorModal } from "@/components/modal/PresetEditorModal";
// No useAppearance — this island renders outside AppearanceProvider during SSR

interface TypePreset {
  name: string;
  tag: string;
  size: string;
  weight: number;
  lh: string;
  ls: string;
  role: string;
  sample: string;
  isLink?: boolean;
}

/* ─── Syntax color tokens — dark & light ─── */
const SYN_DARK = {
  keyword: "#c792ea",
  name: "#82aaff",
  string: "#c3e88d",
  operator: "#89ddff",
  property: "#f78c6c",
  punctuation: "#babed8",
  text: "#d6deeb",
};
const SYN_LIGHT = {
  keyword: "#7c3aed",    // purple
  name: "#2563eb",       // blue
  string: "#16a34a",     // green
  operator: "#0891b2",   // cyan
  property: "#ea580c",   // orange
  punctuation: "#6b7280", // gray
  text: "#1f2937",       // dark gray
};

/* Static syntax-highlighted code blocks */
function CodePreview({ sample, size, weight, lh, isDark }: { sample: string; size: string; weight: number; lh: string; isDark: boolean }) {
  const syn = isDark ? SYN_DARK : SYN_LIGHT;
  const highlighted = getHighlightedCode(sample, syn);
  return (
    <div
      className="rounded-[8px] px-3.5 py-2.5 overflow-hidden"
      style={{
        background: "var(--theme-table-bg)",
        border: "1px solid var(--theme-divider)",
      }}
    >
      <code
        className="block whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          fontSize: size,
          fontWeight: weight,
          lineHeight: lh,
          fontFamily: "var(--font-mono)",
          color: syn.text,
        }}
      >
        {highlighted}
      </code>
    </div>
  );
}

function getHighlightedCode(sample: string, syn: typeof SYN_DARK): React.ReactNode {
  if (sample.includes("const theme")) {
    return (
      <>
        <span style={{ color: syn.keyword }}>const</span>
        <span style={{ color: syn.text }}> </span>
        <span style={{ color: syn.name }}>theme</span>
        <span style={{ color: syn.text }}> </span>
        <span style={{ color: syn.operator }}>=</span>
        <span style={{ color: syn.text }}> </span>
        <span style={{ color: syn.string }}>&apos;glassmorphism&apos;</span>
        <span style={{ color: syn.punctuation }}>;</span>
      </>
    );
  }
  if (sample.includes("var(--glass")) {
    return (
      <>
        <span style={{ color: syn.keyword }}>var</span>
        <span style={{ color: syn.punctuation }}>(</span>
        <span style={{ color: syn.property }}>--glass-radius</span>
        <span style={{ color: syn.punctuation }}>)</span>
      </>
    );
  }
  return <span style={{ color: syn.text }}>{sample}</span>;
}

const INITIAL_PRESETS: TypePreset[] = [
  { name: "Display", tag: "h1", size: "36px", weight: 750, lh: "1.1", ls: "-0.035em", role: "Heading", sample: "Design systems that feel alive" },
  { name: "H1", tag: "h1", size: "30px", weight: 750, lh: "1.2", ls: "-0.03em", role: "Heading", sample: "Page heading" },
  { name: "H2", tag: "h2", size: "24px", weight: 700, lh: "1.25", ls: "-0.02em", role: "Heading", sample: "Section heading" },
  { name: "H3", tag: "h3", size: "20px", weight: 650, lh: "1.3", ls: "-0.015em", role: "Heading", sample: "Subsection heading" },
  { name: "H4", tag: "h4", size: "17px", weight: 600, lh: "1.35", ls: "-0.01em", role: "Heading", sample: "Card heading" },
  { name: "H5", tag: "h5", size: "15px", weight: 600, lh: "1.4", ls: "0", role: "Heading", sample: "Small heading" },
  { name: "H6", tag: "h6", size: "13px", weight: 600, lh: "1.4", ls: "0.02em", role: "Heading", sample: "Micro heading" },
  { name: "Body", tag: "p", size: "15px", weight: 450, lh: "1.6", ls: "0", role: "Body", sample: "Every surface in Gel UI is designed to feel alive — blurring, refracting, and breathing with the content behind it. From volumetric gel shadows to adaptive contrast detection, each layer responds to its environment in real time." },
  { name: "Body Sm", tag: "p", size: "13px", weight: 450, lh: "1.5", ls: "0", role: "Body", sample: "Smaller body text for descriptions and secondary content." },
  { name: "Caption", tag: "span", size: "11.5px", weight: 500, lh: "1.4", ls: "0.02em", role: "UI", sample: "Caption text for metadata" },
  { name: "Overline", tag: "span", size: "10px", weight: 650, lh: "1.2", ls: "0.1em", role: "UI", sample: "OVERLINE LABEL" },
  { name: "Label", tag: "label", size: "13px", weight: 600, lh: "1", ls: "0.02em", role: "UI", sample: "Form label" },
  { name: "Code", tag: "code", size: "13px", weight: 500, lh: "1.5", ls: "0", role: "Mono", sample: "const theme = 'glassmorphism';" },
  { name: "Code Sm", tag: "code", size: "11px", weight: 500, lh: "1.4", ls: "0", role: "Mono", sample: "var(--glass-radius)" },
  { name: "Link", tag: "a", size: "15px", weight: 550, lh: "1.5", ls: "0", role: "Body", sample: "Learn more about GelUI →", isLink: true },
];

const TAG_COLORS: Record<string, { bg: string; darkBg: string; text: string; darkText: string }> = {
  h1: { bg: "#e8e8ff", darkBg: "#e8e8ff", text: "#3030a0", darkText: "#3030a0" },
  h2: { bg: "#f0e0ff", darkBg: "#f0e0ff", text: "#6030a0", darkText: "#6030a0" },
  h3: { bg: "#e0f0ff", darkBg: "#e0f0ff", text: "#2060a0", darkText: "#2060a0" },
  h4: { bg: "#e0ffe8", darkBg: "#e0ffe8", text: "#208050", darkText: "#208050" },
  h5: { bg: "#f5f5d8", darkBg: "#f5f5d8", text: "#808020", darkText: "#808020" },
  h6: { bg: "#ffe8d8", darkBg: "#ffe8d8", text: "#a06020", darkText: "#a06020" },
  p: { bg: "#e0f0e0", darkBg: "#e0f0e0", text: "#306030", darkText: "#306030" },
  span: { bg: "#ececec", darkBg: "#ececec", text: "#505050", darkText: "#505050" },
  label: { bg: "#f0e0f0", darkBg: "#f0e0f0", text: "#803080", darkText: "#803080" },
  code: { bg: "#f0ecd8", darkBg: "#f0ecd8", text: "#706020", darkText: "#706020" },
  a: { bg: "#d8e8ff", darkBg: "#d8e8ff", text: "#2050a0", darkText: "#2050a0" },
};

/* ─── Explicit scale presets with clean values ─── */
type ScaleKey = "small" | "medium" | "large";

// Each row: [size, weight, lh] — all values exist in SIZE_OPTIONS, WEIGHT_OPTIONS, LH_OPTIONS
const SCALE_MAP: Record<ScaleKey, Array<{ size: string; weight: number; lh: string }>> = {
  small: [
    { size: "28px", weight: 700, lh: "1.1" },   // Display
    { size: "24px", weight: 700, lh: "1.2" },   // H1
    { size: "20px", weight: 650, lh: "1.25" },  // H2
    { size: "17px", weight: 600, lh: "1.3" },   // H3
    { size: "15px", weight: 600, lh: "1.35" },  // H4
    { size: "13px", weight: 550, lh: "1.4" },   // H5
    { size: "11px", weight: 550, lh: "1.4" },   // H6
    { size: "13px", weight: 400, lh: "1.5" },   // Body
    { size: "11px", weight: 400, lh: "1.4" },   // Body Sm
    { size: "10px", weight: 500, lh: "1.4" },   // Caption
    { size: "9px",  weight: 600, lh: "1.2" },   // Overline
    { size: "11px", weight: 550, lh: "1" },     // Label
    { size: "11px", weight: 500, lh: "1.4" },   // Code
    { size: "10px", weight: 500, lh: "1.4" },   // Code Sm
    { size: "13px", weight: 500, lh: "1.4" },   // Link
  ],
  medium: [
    { size: "36px", weight: 750, lh: "1.1" },   // Display
    { size: "30px", weight: 750, lh: "1.2" },   // H1
    { size: "24px", weight: 700, lh: "1.25" },  // H2
    { size: "20px", weight: 650, lh: "1.3" },   // H3
    { size: "17px", weight: 600, lh: "1.35" },  // H4
    { size: "15px", weight: 600, lh: "1.4" },   // H5
    { size: "13px", weight: 600, lh: "1.4" },   // H6
    { size: "15px", weight: 450, lh: "1.6" },   // Body
    { size: "13px", weight: 450, lh: "1.5" },   // Body Sm
    { size: "11.5px", weight: 500, lh: "1.4" }, // Caption
    { size: "10px", weight: 650, lh: "1.2" },   // Overline
    { size: "13px", weight: 600, lh: "1" },     // Label
    { size: "13px", weight: 500, lh: "1.5" },   // Code
    { size: "11px", weight: 500, lh: "1.4" },   // Code Sm
    { size: "15px", weight: 550, lh: "1.5" },   // Link
  ],
  large: [
    { size: "44px", weight: 800, lh: "1.05" },  // Display
    { size: "36px", weight: 800, lh: "1.1" },   // H1
    { size: "30px", weight: 750, lh: "1.2" },   // H2
    { size: "24px", weight: 700, lh: "1.25" },  // H3
    { size: "20px", weight: 650, lh: "1.3" },   // H4
    { size: "17px", weight: 650, lh: "1.35" },  // H5
    { size: "15px", weight: 650, lh: "1.35" },  // H6
    { size: "17px", weight: 500, lh: "1.7" },   // Body
    { size: "15px", weight: 500, lh: "1.6" },   // Body Sm
    { size: "13px", weight: 550, lh: "1.4" },   // Caption
    { size: "11px", weight: 700, lh: "1.2" },   // Overline
    { size: "15px", weight: 650, lh: "1" },     // Label
    { size: "15px", weight: 500, lh: "1.5" },   // Code
    { size: "13px", weight: 500, lh: "1.4" },   // Code Sm
    { size: "17px", weight: 600, lh: "1.5" },   // Link
  ],
};

// Global scale factor for DSShell (used for scaling all page text)
const SCALE_FACTORS: Record<ScaleKey, number> = { small: 0.82, medium: 1.0, large: 1.22 };

function scalePresets(scale: ScaleKey): TypePreset[] {
  const scaleValues = SCALE_MAP[scale];
  return INITIAL_PRESETS.map((p, i) => ({
    ...p,
    size: scaleValues[i].size,
    weight: scaleValues[i].weight,
    lh: scaleValues[i].lh,
  }));
}

export function TypePresetsTable() {
  // Restore scale from localStorage
  const [scale, setScale] = useState<ScaleKey>("medium");
  const [presets, setPresets] = useState(() => scalePresets("medium"));
  // Detect dark mode safely (no context needed, works during SSR)
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  // Restore presets from localStorage AFTER hydration (not during SSR)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (hydrated) return;
    setHydrated(true);
    try {
      const raw = localStorage.getItem("gelui-type-presets");
      const storedScale = localStorage.getItem("gelui-type-scale") as ScaleKey | null;
      if (storedScale && storedScale !== scale) {
        setScale(storedScale);
      }
      const stored = JSON.parse(raw || "");
      if (Array.isArray(stored) && stored.length === INITIAL_PRESETS.length) {
        setPresets(INITIAL_PRESETS.map((p, i) => ({
          ...p,
          size: stored[i].size || p.size,
          weight: stored[i].weight || p.weight,
          lh: stored[i].lh || p.lh,
          ls: stored[i].ls || p.ls,
        })));
      }
    } catch {
      // No stored presets or parse error — use defaults
    }
  }, []);
  const isModified = scale !== "medium" || JSON.stringify(presets) !== JSON.stringify(INITIAL_PRESETS);

  // Apply scale globally — save to localStorage + inject CSS variables
  useEffect(() => {
    localStorage.setItem("gelui-type-scale", scale);
    window.dispatchEvent(new CustomEvent("gelui-type-scale-change"));
  }, [scale]);

  // Inject CSS variables whenever presets change — propagates to all primitives
  // Skip until hydrated to avoid overwriting blocking script's correct values with defaults
  useEffect(() => {
    if (!hydrated) return;
    const rs = document.documentElement.style;
    const varMap: Record<string, string> = {
      "Display": "display",
      "H1": "h1", "H2": "h2", "H3": "h3", "H4": "h4", "H5": "h5", "H6": "h6",
      "Body": "body", "Body Sm": "body-sm",
      "Caption": "caption", "Overline": "overline", "Label": "label",
      "Code": "code", "Code Sm": "code-sm", "Link": "link",
    };
    for (const p of presets) {
      const key = varMap[p.name];
      if (!key) continue;
      rs.setProperty(`--type-${key}-size`, p.size);
      rs.setProperty(`--type-${key}-weight`, String(p.weight));
      rs.setProperty(`--type-${key}-lh`, p.lh);
      rs.setProperty(`--type-${key}-ls`, p.ls);
    }
    // Save to localStorage for persistence across pages
    localStorage.setItem("gelui-type-presets", JSON.stringify(
      presets.map(p => ({ name: p.name, size: p.size, weight: p.weight, lh: p.lh, ls: p.ls }))
    ));
    window.dispatchEvent(new CustomEvent("gelui-type-presets-change"));
  }, [presets, hydrated]);

  const getFontFamily = (role: string) => {
    switch (role) {
      case "Mono": return "var(--font-mono)";
      case "UI": return "var(--font-ui)";
      case "Body": return "var(--font-body)";
      default: return "var(--font-heading)";
    }
  };

  const getTagStyle = (tag: string) => {
    const tc = TAG_COLORS[tag] ?? { bg: "#ececec", darkBg: "#3a3a3a", text: "#505050", darkText: "#d0d0d0" };
    return {
      background: tc.bg,
      color: tc.text,
    };
  };

  const handleApply = useCallback((size: string, weight: string, lh: string) => {
    if (editingIdx === null) return;
    setPresets((prev) => {
      const next = [...prev];
      next[editingIdx] = { ...next[editingIdx], size, weight: Number(weight), lh };
      return next;
    });
  }, [editingIdx]);

  const editingPreset = editingIdx !== null ? presets[editingIdx] : null;

  // Get a visible tint of the tag color for hover
  const getRowHoverBg = (tag: string) => {
    const tc = TAG_COLORS[tag];
    if (!tc) return "var(--theme-header-bg)";
    return tc.bg;
  };

  return (
    <>
      {/* Scale toggle + Reset — absolute top right */}
      <div suppressHydrationWarning style={{ position: "absolute", top: "20px", right: "20px", zIndex: 2, display: "flex", alignItems: "center", gap: "8px" }}>
        {/* [A|A|A] scale toggle */}
        <div
          className="flex items-end rounded-full overflow-hidden"
          style={{
            background: "var(--theme-header-bg)",
            border: "1px solid var(--theme-divider)",
            padding: "2px",
          }}
        >
          {(["small", "medium", "large"] as ScaleKey[]).map((s) => {
            const isActive = scale === s;
            const fontSize = s === "small" ? "10px" : s === "medium" ? "13px" : "16px";
            return (
              <button
                key={s}
                onClick={() => { setScale(s); setPresets(scalePresets(s)); }}
                className="flex items-center justify-center cursor-pointer border-none transition-all duration-200"
                suppressHydrationWarning
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  background: isActive ? "var(--theme-bg-solid)" : "transparent",
                  color: isActive ? "var(--theme-fg-on-solid)" : "var(--theme-fg-faint)",
                  fontSize,
                  fontWeight: isActive ? 700 : 600,
                  fontFamily: "var(--font-heading)",
                  lineHeight: 1,
                }}
                title={`${s.charAt(0).toUpperCase() + s.slice(1)} type scale`}
              >
                A
              </button>
            );
          })}
        </div>

        {/* Reset button */}
        <button
          onClick={() => { setScale("medium"); setPresets(scalePresets("medium")); }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-[550] transition-all duration-200 cursor-pointer hover:scale-105"
          style={{
            background: "var(--theme-header-bg)",
            color: "var(--theme-fg-muted)",
            border: "1px solid var(--theme-divider)",
            opacity: isModified ? 1 : 0.4,
          }}
          disabled={!isModified}
        >
          Reset
        </button>
      </div>

      <div data-type-presets-table className="flex flex-col rounded-[var(--glass-radius-sm)] overflow-hidden" style={{ background: "var(--theme-table-bg)" }}>
        {/* Header */}
        <div
          className="flex items-center px-4 py-2.5 gap-4"
          style={{
            background: "var(--theme-header-bg)",
            borderBottom: "1px solid var(--theme-divider)",
          }}
        >
          <span className="w-[70px] shrink-0 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--theme-fg-faint)" }}>Preset</span>
          <span className="w-[55px] shrink-0 text-[10px] font-semibold uppercase tracking-widest hidden md:block" style={{ color: "var(--theme-fg-faint)" }}>Tag</span>
          <span className="flex-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--theme-fg-faint)" }}>Preview</span>
          <span className="w-[50px] text-[10px] font-semibold uppercase tracking-widest text-right hidden sm:block" style={{ color: "var(--theme-fg-faint)" }}>Size</span>
          <span className="w-[50px] text-[10px] font-semibold uppercase tracking-widest text-right hidden sm:block" style={{ color: "var(--theme-fg-faint)" }}>Weight</span>
          <span className="w-[65px] text-[10px] font-semibold uppercase tracking-widest text-right hidden md:block" style={{ color: "var(--theme-fg-faint)" }}>Line Height</span>
          <span className="w-[60px] text-[10px] font-semibold uppercase tracking-widest text-right hidden md:block" style={{ color: "var(--theme-fg-faint)" }}>Role</span>
          <span className="w-[24px] shrink-0" />
        </div>

        {/* Rows */}
        {presets.map((t, idx) => (
          <div
            key={t.name}
            className="type-preset-row group flex items-center px-4 lg:px-6 py-3 gap-4 transition-all duration-200 ease-out cursor-pointer hover:!bg-[var(--theme-header-bg)]"
            onClick={() => setEditingIdx(idx)}
            style={{
              background: idx % 2 === 0 ? "var(--theme-header-bg)" : "transparent",
              borderBottom: "1px solid var(--theme-divider)",
              ...(idx === 0 ? { paddingTop: "1.25rem" } : {}),
              ...(idx === presets.length - 1 ? { paddingBottom: "1.25rem" } : {}),
            }}
          >
            {/* Name */}
            <div className="w-[70px] shrink-0">
              <span className="text-[11px] font-semibold transition-colors duration-200" style={{ color: "var(--theme-fg-muted)" }}>{t.name}</span>
            </div>

            {/* Tag */}
            <div className="w-[55px] shrink-0 hidden md:block">
              <span
                className="text-[11px] font-mono font-medium px-2 py-1 rounded-[6px] tag-light"
                style={{
                  ...getTagStyle(t.tag),
                  ["--tag-bg" as string]: TAG_COLORS[t.tag]?.bg,
                  ["--tag-dark-bg" as string]: TAG_COLORS[t.tag]?.darkBg,
                  ["--tag-text" as string]: TAG_COLORS[t.tag]?.text,
                  ["--tag-dark-text" as string]: TAG_COLORS[t.tag]?.darkText,
                }}
              >
                &lt;{t.tag}&gt;
              </span>
            </div>

            {/* Preview */}
            <div className="flex-1 min-w-0 overflow-hidden">
              {t.tag === "code" ? (
                <CodePreview sample={t.sample} size={t.size} weight={t.weight} lh={t.lh} isDark={isDark} />
              ) : (
                <span
                  className={`block ${t.tag !== "p" ? "truncate" : ""} ${t.isLink ? "underline decoration-1 underline-offset-2" : ""}`}
                  style={{
                    fontSize: t.size,
                    fontWeight: t.weight,
                    lineHeight: t.lh,
                    letterSpacing: t.ls,
                    fontFamily: getFontFamily(t.role),
                    color: t.isLink ? "var(--theme-fg-muted)" : "var(--theme-fg)",
                  }}
                >
                  {t.sample}
                </span>
              )}
            </div>

            {/* Size (plain text) */}
            <div className="w-[50px] text-right hidden sm:block">
              <span className="text-[11px] font-mono" style={{ color: "var(--theme-fg-subtle)" }}>{t.size}</span>
            </div>

            {/* Weight (plain text) */}
            <div className="w-[50px] text-right hidden sm:block">
              <span className="text-[11px] font-mono" style={{ color: "var(--theme-fg-subtle)" }}>{t.weight}</span>
            </div>

            {/* Line Height (plain text) */}
            <div className="w-[65px] text-right hidden md:block">
              <span className="text-[11px] font-mono" style={{ color: "var(--theme-fg-subtle)" }}>{t.lh}</span>
            </div>

            {/* Role */}
            <div className="w-[60px] hidden md:block">
              <span
                className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--theme-bg-solid)",
                  color: "var(--theme-fg-on-solid)",
                }}
              >
                {t.role}
              </span>
            </div>

            {/* Settings icon — visible on hover */}
            <div className="w-[24px] shrink-0 flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Unified Editor Modal */}
      {editingPreset && (
        <PresetEditorModal
          isOpen={editingIdx !== null}
          onClose={() => setEditingIdx(null)}
          presetName={editingPreset.name}
          sample={editingPreset.sample}
          fontFamily={getFontFamily(editingPreset.role)}
          size={editingPreset.size}
          weight={String(editingPreset.weight)}
          lh={editingPreset.lh}
          onApply={handleApply}
        />
      )}
    </>
  );
}
