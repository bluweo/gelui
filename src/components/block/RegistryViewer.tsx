import { useState, useEffect, useMemo } from "react";
import type { ComponentRegistryEntry, Layer, Status, Category } from "@/registry/types";

/* ═══════════════════════════════════════════════
   RegistryViewer — Interactive component registry table
   React island with search, filter, and expandable rows.
   ═══════════════════════════════════════════════ */

interface Props {
  components: ComponentRegistryEntry[];
}

/* ── Constants ── */

const LAYER_COLORS: Record<Layer, string> = {
  core: "#6B7280",
  token: "#FFC800",
  primitive: "#354334",
  component: "#4A5E48",
  pattern: "#7B9779",
  layout: "#97AD96",
};

const LAYER_LABELS: Record<Layer, string> = {
  core: "Core",
  token: "Token",
  primitive: "Primitive",
  component: "Component",
  pattern: "Pattern",
  layout: "Layout",
};

const STATUS_ICONS: Record<Status, string> = {
  stable: "\u2705",
  beta: "\u26A0\uFE0F",
  experimental: "\uD83D\uDD2C",
  planned: "\uD83D\uDCCB",
  deprecated: "\u274C",
};

const STATUS_LABELS: Record<Status, string> = {
  stable: "Stable",
  beta: "Beta",
  experimental: "Experimental",
  planned: "Planned",
  deprecated: "Deprecated",
};

const ALL_LAYERS: Layer[] = ["core", "token", "primitive", "component", "pattern", "layout"];
const ALL_STATUSES: Status[] = ["stable", "beta", "experimental", "planned", "deprecated"];

const CATEGORY_LABELS: Record<Category, string> = {
  typography: "Typography",
  interactive: "Interactive",
  surface: "Surface",
  form: "Form",
  feedback: "Feedback",
  navigation: "Navigation",
  layout: "Layout",
  data: "Data",
  overlay: "Overlay",
  media: "Media",
  color: "Color",
  spacing: "Spacing",
  motion: "Motion",
  glass: "Glass",
};

/* ── Helpers ── */

function getLayerTextColor(layer: Layer): string {
  if (layer === "token") return "#000";
  if (layer === "layout" || layer === "pattern") return "#1a1a1a";
  return "#fff";
}

/* ── Component ── */

export function RegistryViewer({ components }: Props) {
  const [search, setSearch] = useState("");
  const [layerFilter, setLayerFilter] = useState<Layer | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Dark mode observer
  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.getAttribute("data-theme") === "dark");

    const observer = new MutationObserver(() => {
      setIsDark(root.getAttribute("data-theme") === "dark");
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Filtered components
  const filtered = useMemo(() => {
    return components.filter((c) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const haystack = [c.name, c.id, c.displayName, ...c.tags].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      // Layer
      if (layerFilter !== "all" && c.layer !== layerFilter) return false;
      // Status
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      // Category
      if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
      return true;
    });
  }, [components, search, layerFilter, statusFilter, categoryFilter]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<Category, ComponentRegistryEntry[]>();
    for (const c of filtered) {
      const list = map.get(c.category) || [];
      list.push(c);
      map.set(c.category, list);
    }
    return map;
  }, [filtered]);

  // Unique categories present in data
  const availableCategories = useMemo(() => {
    const cats = new Set<Category>();
    components.forEach((c) => cats.add(c.category));
    return Array.from(cats).sort();
  }, [components]);

  // Footer stats
  const stats = useMemo(() => {
    const primitives = filtered.filter((c) => c.layer === "primitive").length;
    const tokens = filtered.filter((c) => c.layer === "token").length;
    const comps = filtered.filter((c) => c.layer === "component").length;
    const planned = filtered.filter((c) => c.status === "planned").length;
    return { primitives, tokens, comps, planned, total: filtered.length };
  }, [filtered]);

  // Row numbering
  let rowIndex = 0;

  const textPrimary = isDark ? "#ffffff" : "#000000";
  const textSecondary = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const textMuted = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const bgCard = isDark ? "#1a1a1a" : "#ffffff";
  const bgHover = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const bgCategoryHeader = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const bgExpanded = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const bgInput = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)";

  return (
    <div id="registry-table" style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}>
      {/* ── Filters ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={textMuted}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search components by name, ID, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              borderRadius: "var(--glass-radius-sm, 10px)",
              border: `1px solid ${borderColor}`,
              background: bgInput,
              backdropFilter: "blur(12px)",
              color: textPrimary,
              fontSize: "13px",
              fontWeight: 500,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Layer pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          <FilterPill
            label="All"
            active={layerFilter === "all"}
            onClick={() => setLayerFilter("all")}
            isDark={isDark}
          />
          {ALL_LAYERS.map((l) => (
            <FilterPill
              key={l}
              label={LAYER_LABELS[l]}
              active={layerFilter === l}
              onClick={() => setLayerFilter(l)}
              isDark={isDark}
              dotColor={LAYER_COLORS[l]}
            />
          ))}
        </div>

        {/* Status + Category row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          {/* Status filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted, marginRight: "4px" }}>Status</span>
            <FilterPill label="All" active={statusFilter === "all"} onClick={() => setStatusFilter("all")} isDark={isDark} />
            {ALL_STATUSES.map((s) => (
              <FilterPill
                key={s}
                label={STATUS_LABELS[s]}
                active={statusFilter === s}
                onClick={() => setStatusFilter(s)}
                isDark={isDark}
                icon={STATUS_ICONS[s]}
              />
            ))}
          </div>

          {/* Category dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted }}>Category</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category | "all")}
              style={{
                padding: "5px 8px",
                borderRadius: "var(--glass-radius-sm, 10px)",
                border: `1px solid ${borderColor}`,
                background: bgInput,
                color: textPrimary,
                fontSize: "12px",
                fontWeight: 550,
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="all">All Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div
        style={{
          borderRadius: "var(--glass-radius, 16px)",
          border: `1px solid ${borderColor}`,
          overflow: "hidden",
          background: bgCard,
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr 0.9fr 1.2fr 0.6fr 0.4fr",
            padding: "10px 16px",
            borderBottom: `1px solid ${borderColor}`,
            background: bgCategoryHeader,
            gap: "8px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>#</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>Component</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>DSL ID</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>File</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>Layer</span>
          <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>Status</span>
        </div>

        {/* Grouped rows */}
        {Array.from(grouped.entries()).map(([category, items]) => (
          <div key={category}>
            {/* Category header */}
            <div
              style={{
                padding: "8px 16px",
                background: bgCategoryHeader,
                borderBottom: `1px solid ${borderColor}`,
                borderTop: `1px solid ${borderColor}`,
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: textSecondary }}>
                {CATEGORY_LABELS[category] || category}
              </span>
              <span style={{ fontSize: "11px", fontWeight: 500, color: textMuted, marginLeft: "8px" }}>
                {items.length}
              </span>
            </div>

            {/* Component rows */}
            {items.map((comp) => {
              rowIndex++;
              const isExpanded = expandedId === comp.id;
              return (
                <div key={comp.id}>
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : comp.id)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr 0.9fr 1.2fr 0.6fr 0.4fr",
                      padding: "10px 16px",
                      borderBottom: `1px solid ${borderColor}`,
                      gap: "8px",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "background 0.15s",
                      background: isExpanded ? bgExpanded : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded) e.currentTarget.style.background = bgHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isExpanded ? bgExpanded : "transparent";
                    }}
                  >
                    {/* # */}
                    <span style={{ fontSize: "12px", fontWeight: 500, color: textMuted, fontVariantNumeric: "tabular-nums" }}>
                      {rowIndex}
                    </span>

                    {/* Component name */}
                    <div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: textPrimary }}>{comp.displayName}</span>
                      {comp.description && (
                        <p style={{ fontSize: "11px", color: textMuted, margin: "2px 0 0", lineHeight: 1.4 }}>{comp.description}</p>
                      )}
                    </div>

                    {/* DSL ID pill */}
                    <div>
                      <code
                        style={{
                          fontSize: "11px",
                          fontWeight: 550,
                          fontFamily: "var(--font-mono, monospace)",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                          color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
                        }}
                      >
                        {comp.id}
                      </code>
                    </div>

                    {/* File path */}
                    <div style={{ overflow: "hidden" }}>
                      {comp.path ? (
                        <code
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-mono, monospace)",
                            color: textMuted,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "block",
                          }}
                          title={comp.path}
                        >
                          {comp.path.replace(/^src\//, "").replace(/\.tsx?$/, "")}
                        </code>
                      ) : (
                        <span style={{ fontSize: "10px", color: textMuted, opacity: 0.4 }}>—</span>
                      )}
                    </div>

                    {/* Layer badge */}
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "10px",
                          fontWeight: 650,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: LAYER_COLORS[comp.layer],
                          color: getLayerTextColor(comp.layer),
                        }}
                      >
                        {LAYER_LABELS[comp.layer]}
                      </span>
                    </div>

                    {/* Status */}
                    <span style={{ fontSize: "12px" }} title={STATUS_LABELS[comp.status]}>
                      {STATUS_ICONS[comp.status]} <span style={{ fontSize: "11px", color: textSecondary }}>{STATUS_LABELS[comp.status]}</span>
                    </span>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: "16px 16px 16px 56px",
                        borderBottom: `1px solid ${borderColor}`,
                        background: bgExpanded,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        fontSize: "12px",
                      }}
                    >
                      {/* Left: Props */}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted, marginBottom: "8px" }}>
                          Props Schema
                        </div>
                        {Object.keys(comp.props).length > 0 ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            {Object.entries(comp.props).map(([name, schema]) => (
                              <div key={name} style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                                <code style={{ fontSize: "11px", fontWeight: 600, fontFamily: "var(--font-mono, monospace)", color: isDark ? "#97AD96" : "#4A5E48" }}>
                                  {name}
                                </code>
                                <span style={{ fontSize: "10px", color: textMuted }}>
                                  {schema.type}
                                  {schema.required && <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>}
                                  {schema.default !== undefined && (
                                    <span style={{ marginLeft: "4px" }}>= {String(schema.default)}</span>
                                  )}
                                </span>
                                {schema.description && (
                                  <span style={{ fontSize: "10px", color: textMuted, fontStyle: "italic" }}>{schema.description}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span style={{ fontSize: "11px", color: textMuted, fontStyle: "italic" }}>No props defined</span>
                        )}
                      </div>

                      {/* Right: Metadata */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ fontWeight: 700, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: textMuted, marginBottom: "4px" }}>
                          Metadata
                        </div>
                        <MetaRow label="Path" value={comp.path} isDark={isDark} />
                        <MetaRow label="Version" value={comp.version} isDark={isDark} />
                        <MetaRow label="React" value={comp.isReact ? "Yes" : "No"} isDark={isDark} />
                        {comp.tags.length > 0 && (
                          <div>
                            <span style={{ fontSize: "10px", fontWeight: 600, color: textMuted }}>Tags: </span>
                            <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "4px", marginTop: "2px" }}>
                              {comp.tags.map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: 550,
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                                    color: textSecondary,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </span>
                          </div>
                        )}
                        {comp.slots && Object.keys(comp.slots).length > 0 && (
                          <div>
                            <span style={{ fontSize: "10px", fontWeight: 600, color: textMuted }}>Slots: </span>
                            {Object.entries(comp.slots).map(([slotName, slotSchema]) => (
                              <div key={slotName} style={{ marginTop: "2px", marginLeft: "8px" }}>
                                <code style={{ fontSize: "10px", fontFamily: "var(--font-mono, monospace)", fontWeight: 600, color: isDark ? "#97AD96" : "#4A5E48" }}>
                                  {slotName}
                                </code>
                                <span style={{ fontSize: "10px", color: textMuted, marginLeft: "4px" }}>
                                  accepts: {slotSchema.accepts.join(", ")}
                                  {slotSchema.multiple && " (multiple)"}
                                  {slotSchema.required && " (required)"}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {comp.documentedOn && (
                          <MetaRow label="Documented" value={comp.documentedOn + (comp.section ? ` #${comp.section}` : "")} isDark={isDark} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ padding: "40px 16px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: textMuted }}>No components match your filters.</p>
          </div>
        )}
      </div>

      {/* ── Footer stats ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6px 16px",
          padding: "12px 0 4px",
          fontSize: "12px",
          fontWeight: 550,
          color: textMuted,
        }}
      >
        <span>{stats.total} Total</span>
        <span style={{ opacity: 0.4 }}>&middot;</span>
        <span>{stats.primitives} Primitives</span>
        <span style={{ opacity: 0.4 }}>&middot;</span>
        <span>{stats.tokens} Tokens</span>
        <span style={{ opacity: 0.4 }}>&middot;</span>
        <span>{stats.comps} Components</span>
        <span style={{ opacity: 0.4 }}>&middot;</span>
        <span>{stats.planned} Planned</span>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function FilterPill({
  label,
  active,
  onClick,
  isDark,
  dotColor,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  isDark: boolean;
  dotColor?: string;
  icon?: string;
}) {
  const bg = active
    ? isDark
      ? "rgba(255,255,255,0.14)"
      : "rgba(0,0,0,0.1)"
    : isDark
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.04)";
  const color = active
    ? isDark
      ? "#ffffff"
      : "#000000"
    : isDark
      ? "rgba(255,255,255,0.55)"
      : "rgba(0,0,0,0.55)";

  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 10px",
        borderRadius: "999px",
        border: `1px solid ${active ? (isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)") : "transparent"}`,
        background: bg,
        color,
        fontSize: "11px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {dotColor && (
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: dotColor,
            flexShrink: 0,
          }}
        />
      )}
      {icon && <span style={{ fontSize: "12px" }}>{icon}</span>}
      {label}
    </button>
  );
}

function MetaRow({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
      <span style={{ fontSize: "10px", fontWeight: 600, color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}>{label}:</span>
      <code
        style={{
          fontSize: "11px",
          fontFamily: "var(--font-mono, monospace)",
          color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
        }}
      >
        {value}
      </code>
    </div>
  );
}

export default RegistryViewer;
