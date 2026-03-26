import { useState } from "react";

interface Feature {
  title: string;
  desc: string;
  tag: string;
  color: string;
  icon: string;
}

const FEATURES: Feature[] = [
  {
    title: "Adaptive Contrast Detection",
    desc: "useContrastColor hook samples the background via canvas to flip text/icons light or dark automatically. Works across portals, gel surfaces, and dynamic backgrounds.",
    tag: "Styling",
    color: "#60A5FA",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" opacity=".3"/></svg>`,
  },
  {
    title: "Gel Glass Material",
    desc: "10-layer volumetric inset shadow system with specular highlights, frosted blur, and gel tint. Pre-computed in JavaScript for GPU-safe rendering.",
    tag: "Styling",
    color: "#60A5FA",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M3 8h18" opacity=".3"/><path d="M7 3v18" opacity=".15"/></svg>`,
  },
  {
    title: "Standard Glass Levels",
    desc: "4 glass transparency levels (glass-0 to glass-3) with backdrop-filter blur, saturate, and specular gradient overlays. Configurable via appearance settings.",
    tag: "Styling",
    color: "#60A5FA",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="6" width="14" height="14" rx="4" opacity=".3"/><rect x="8" y="2" width="14" height="14" rx="4"/></svg>`,
  },
  {
    title: "Seamless Page Transitions",
    desc: "Astro View Transitions API for instant, SPA-like navigation without full page reloads. Background, theme, and appearance state persist across pages.",
    tag: "Interaction",
    color: "#F472B6",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/><path d="M3 6v12" opacity=".3"/></svg>`,
  },
  {
    title: "Reusable Astro Components",
    desc: "Every documentation block is a self-contained .astro component in src/components/ds/. Import and compose on any page \u2014 zero JavaScript shipped.",
    tag: "System",
    color: "#FB923C",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2" opacity=".3"/><rect x="3" y="13" width="8" height="8" rx="2" opacity=".3"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>`,
  },
  {
    title: "Live Appearance Settings",
    desc: "Right-click to adjust transparency, blur intensity, border radius, and shadow depth in real time. All glass and gel surfaces update instantly via CSS variables.",
    tag: "Interaction",
    color: "#F472B6",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4" opacity=".4"/><path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" opacity=".2"/></svg>`,
  },
  {
    title: "Dynamic Background System",
    desc: "Switch between image, video, and CSS pattern backgrounds. Theme-aware filtering shows only light or dark backgrounds. Persisted in localStorage.",
    tag: "Interaction",
    color: "#F472B6",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="2" opacity=".4"/><path d="M21 15l-5-5L5 21"/></svg>`,
  },
  {
    title: "Right-Click Context Menu",
    desc: "Custom glass context menu with appearance, background, theme, and fullscreen options. Portaled to body with contrast-aware gel styling.",
    tag: "Interaction",
    color: "#F472B6",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 12h8M8 15h5" opacity=".5"/></svg>`,
  },
  {
    title: "Dark & Light Theme",
    desc: "Full dark mode via data-theme attribute with CSS custom properties. Every glass, gel, shadow, and text color adapts. Toggle from nav or context menu.",
    tag: "Styling",
    color: "#60A5FA",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.64-6.36l-.7.7M6.34 17.66l-.7.7m0-12.72l.7.7m11.32 11.32l.7.7"/><circle cx="12" cy="12" r="4"/></svg>`,
  },
  {
    title: "Liquid Glass SVG Filter",
    desc: "SVG displacement map with fractal noise, specular lighting, and composite layers for physical glass refraction on gel surfaces.",
    tag: "Styling",
    color: "#60A5FA",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity=".2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>`,
  },
  {
    title: "Draggable Modals",
    desc: "All modal panels (appearance, background picker) support mouse drag with viewport boundary clamping, re-centering on resize, and Escape to close.",
    tag: "Interaction",
    color: "#F472B6",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M15 3h6v6M9 21H3v-6"/><path d="M21 3l-7 7M3 21l7-7" opacity=".4"/></svg>`,
  },
  {
    title: "Scroll-Aware Navigation",
    desc: "Sticky gel glass nav hides on scroll down, reappears on scroll up. Active tab tracks current route with glass button highlight and icon tooltips.",
    tag: "Interaction",
    color: "#F472B6",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18" opacity=".4"/><circle cx="8" cy="6" r="2" fill="currentColor" opacity=".6"/></svg>`,
  },
  {
    title: "Liquid Glass Slider",
    desc: "Custom range input with glass track, animated fill, and gel thumb. Supports pointer drag, keyboard arrows, and accessibility labels.",
    tag: "Interaction",
    color: "#F472B6",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 12h16"/><circle cx="14" cy="12" r="3"/></svg>`,
  },
  {
    title: "Glass Tooltip System",
    desc: "Delayed glass tooltips on nav icons with instant show on subsequent hovers (300ms grace period). Portaled positioning below target element.",
    tag: "Interaction",
    color: "#F472B6",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="4" width="16" height="12" rx="3"/><path d="M12 16v2"/><path d="M9 22h6" opacity=".3"/></svg>`,
  },
  {
    title: "Responsive Breakpoints",
    desc: "5 breakpoints (480\u20131536px) with mobile-first Tailwind utilities. Glass grid adapts from 4 columns to 1 column. Nav collapses icon labels.",
    tag: "System",
    color: "#FB923C",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M8 4v16" opacity=".2"/><path d="M16 4v16" opacity=".2"/></svg>`,
  },
  {
    title: "Accessibility Support",
    desc: "prefers-reduced-motion disables animations. prefers-reduced-transparency adjusts glass opacity. Keyboard navigation and ARIA labels throughout.",
    tag: "System",
    color: "#FB923C",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="4.5" r="2"/><path d="M7 8h10"/><path d="M12 8v6"/><path d="M9 20l3-6 3 6"/></svg>`,
  },
  {
    title: "20+ Micro-Animations",
    desc: "Panel enter, backdrop fade, context menu scale, shimmer slide, dock rise, card enter, dot pulse, cloud drift \u2014 all with Apple-style cubic-bezier easing.",
    tag: "Styling",
    color: "#60A5FA",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 20 C 8 4, 16 4, 20 20" opacity=".4"/><circle cx="12" cy="10" r="2"/></svg>`,
  },
  {
    title: "Design Token System",
    desc: "TypeScript token files for colors, typography, spacing, radii, shadows, glass, motion, and breakpoints. Drives both CSS @theme and runtime JS.",
    tag: "System",
    color: "#FB923C",
    icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z" opacity=".3"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  },
];

// 4 clear tag groups
const TAG_COLORS: Record<string, string> = {
  Styling: "#60A5FA",
  Interaction: "#F472B6",
  System: "#FB923C",
};

const TAGS = ["Styling", "Interaction", "System"];

export function FeaturesGrid() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? FEATURES.filter((f) => f.tag === activeTag)
    : FEATURES;

  return (
    <div suppressHydrationWarning>
      {/* Header row: title left, tags right */}
      <div className="flex items-start justify-between gap-6 mb-8 pt-3 pl-2 max-[640px]:flex-col max-[640px]:gap-4">
        {/* Left: Title & subtitle */}
        <div className="flex flex-col shrink-0">
          <span className="text-[10px] font-[650] uppercase tracking-[0.1em] text-black/40 dark:text-white/40 mb-2">
            What's inside
          </span>
          <h2 className="text-[28px] max-[540px]:text-[22px] font-[750] tracking-[-0.03em] leading-[1.2] text-black dark:text-white mb-2">
            Powerful Features
          </h2>
          <p className="text-[14px] max-[540px]:text-[13px] leading-[1.6] text-black/60 dark:text-white/60 max-w-[560px]">
            Power your UI with {FEATURES.length} advanced capabilities across visual, interactive, and architectural layers.
          </p>
        </div>

        {/* Right: Tag filters */}
        <div className="flex items-center gap-2 flex-wrap justify-end max-[640px]:justify-start" style={{ isolation: "isolate" }}>
          {[{ tag: "All", color: "" }, ...TAGS.map((t) => ({ tag: t, color: TAG_COLORS[t] || "#888" }))].map(({ tag, color }) => {
            const isActive = tag === "All" ? activeTag === null : activeTag === tag;
            const count = tag === "All" ? FEATURES.length : FEATURES.filter((f) => f.tag === tag).length;
            const isAllTag = tag === "All";
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === "All" ? null : (activeTag === tag ? null : tag))}
                className={`px-4 py-2 rounded-[var(--glass-radius-sm)] text-[12px] font-[600] transition-all duration-200 cursor-pointer border border-black/[0.06] dark:border-white/[0.08] ${
                  isActive
                    ? "text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
                    : "bg-white dark:bg-white/[0.08] text-[#888] dark:text-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                }`}
                style={{
                  ...(isActive
                    ? {
                        backgroundColor: isAllTag ? "var(--theme-bg-solid)" : color,
                        ...(isAllTag ? {} : { boxShadow: `0 2px 10px ${color}35` }),
                      }
                    : {}),
                }}
              >
                {tag}
                <span
                  className="ml-1.5 text-[11px]"
                  style={{ opacity: isActive ? 0.75 : 0.45 }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature cards grid */}
      <div
        className="grid grid-cols-3 gap-3 max-[860px]:grid-cols-2 max-[540px]:grid-cols-1"
        style={{ transition: "all 0.3s ease" }}
      >
        {filtered.map((f) => (
          <div
            key={f.title}
            className="group flex flex-col rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a24] border border-gray-100 dark:border-white/[0.08] overflow-hidden transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            style={{
              animation: "featureCardIn 0.3s ease both",
            }}
          >
            {/* Placeholder image */}
            <div className="w-full aspect-[16/10] bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center">
              <div
                className="w-12 h-12 rounded-[12px] flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: `color-mix(in srgb, ${f.color} 10%, transparent)`,
                  color: f.color,
                }}
                dangerouslySetInnerHTML={{ __html: f.icon }}
              />
            </div>
            {/* Content */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-[650] leading-tight text-black dark:text-white">
                  {f.title}
                </span>
                <span
                  className="text-[10px] font-[600] uppercase tracking-[0.05em] leading-none"
                  style={{ color: f.color }}
                >
                  {f.tag}
                </span>
              </div>
              <p className="text-[13px] text-black/70 dark:text-white/70 leading-[1.55]">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
