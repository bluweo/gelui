import { useState, useEffect, useRef } from "react";

const FONT_ROLES = [
  { key: "heading", label: "Heading", cssVar: "--font-heading" },
  { key: "body", label: "Body", cssVar: "--font-body" },
  { key: "ui", label: "UI", cssVar: "--font-ui" },
  { key: "mono", label: "Mono", cssVar: "--font-mono" },
] as const;

// Token data passed as props from Astro
interface Props {
  fontSizes: Array<[string, string]>;
  fontWeights: Array<[string, number]>;
}

export function FontSizeWeightTable({ fontSizes, fontWeights }: Props) {
  const [selectedRole, setSelectedRole] = useState<string>("body");
  const [sampleText, setSampleText] = useState("The quick brown fox");
  const [sampleTextWeight, setSampleTextWeight] = useState("The quick brown fox jumps");

  // Listen for preview text changes from FontPickerModal
  useEffect(() => {
    const handler = (e: Event) => {
      const text = (e as CustomEvent).detail?.text;
      if (text) {
        setSampleText(text.length > 25 ? text.substring(0, 25) : text);
        setSampleTextWeight(text.length > 35 ? text.substring(0, 35) : text);
      }
    };
    window.addEventListener("gelui:font-preview-text", handler);
    return () => window.removeEventListener("gelui:font-preview-text", handler);
  }, []);

  const role = FONT_ROLES.find((r) => r.key === selectedRole) ?? FONT_ROLES[1];
  const cssVar = `var(${role.cssVar})`;
  const isMono = selectedRole === "mono";

  return (
    <div className="flex flex-col gap-6">
      {/* Font role selector — aligned with title row on desktop+, below subtitle on laptop and smaller */}
      <div className="flex gap-1.5 justify-end -mt-[90px] mb-8 relative z-[2] max-[1024px]:mt-0 max-[1024px]:mb-3 max-[1024px]:justify-start">
        {FONT_ROLES.map((r) => (
          <button
            key={r.key}
            onClick={() => setSelectedRole(r.key)}
            className={`text-[11px] font-[600] px-3 py-1.5 rounded-full transition-all duration-150 uppercase tracking-[0.02em] ${
              selectedRole === r.key
                ? "bg-black/80 dark:bg-white/20 text-white"
                : "bg-black/[0.04] dark:bg-white/[0.06] text-black/50 dark:text-white/40 hover:bg-black/[0.08] dark:hover:bg-white/[0.1]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Font Sizes Table */}
      <div>
        <h3 className="text-[14px] font-[650] text-black/80 dark:text-white/75 mb-3">Sizes</h3>
        <div className="flex flex-col rounded-[var(--glass-radius-sm)] overflow-hidden">
          {/* Table header */}
          <div className="flex w-full">
            <div className="w-[80px] shrink-0 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
              <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Token</span>
            </div>
            <div className="w-[70px] shrink-0 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
              <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Size</span>
            </div>
            <div className="flex-1 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
              <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Preview</span>
            </div>
          </div>

          {/* Font size rows */}
          {fontSizes.map(([name, size]) => (
            <div
              key={name}
              className="flex w-full items-center border-b border-black/[0.03] dark:border-white/[0.04] last:border-b-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-150"
            >
              <div className="w-[80px] shrink-0 px-3 py-3">
                <span className="text-[12px] font-[600] text-black/80 dark:text-white/80">{name}</span>
              </div>
              <div className="w-[70px] shrink-0 px-3 py-3">
                <span className="text-[12px] font-mono text-black/50 dark:text-white/40 px-2 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08]">
                  {size}
                </span>
              </div>
              <div className="flex-1 px-3 py-3 min-w-0 overflow-hidden">
                <span
                  className="text-black/80 dark:text-white/80 whitespace-nowrap"
                  data-font-preview
                  className="font-preview-span"
                  style={{ "--font-preview": cssVar, "--fp-size": size } as React.CSSProperties}
                >
                  {isMono ? 'const token = "ds";' : sampleText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights Table */}
      <div>
        <h3 className="text-[14px] font-[650] text-black/80 dark:text-white/75 mb-3">Weights</h3>
        <div className="flex flex-col rounded-[var(--glass-radius-sm)] overflow-hidden">
          {/* Table header */}
          <div className="flex w-full">
            <div className="w-[90px] shrink-0 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
              <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Token</span>
            </div>
            <div className="w-[70px] shrink-0 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
              <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Value</span>
            </div>
            <div className="flex-1 px-3 py-2.5 bg-black/[0.04] dark:bg-white/[0.06] border-b border-black/[0.06] dark:border-white/[0.08]">
              <span className="text-[11px] font-[650] uppercase tracking-[0.06em] text-black/60 dark:text-white/50">Preview</span>
            </div>
          </div>

          {/* Weight rows */}
          {fontWeights.map(([name, weight]) => (
            <div
              key={name}
              className="flex w-full items-center border-b border-black/[0.03] dark:border-white/[0.04] last:border-b-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-150"
            >
              <div className="w-[90px] shrink-0 px-3 py-3">
                <span className="text-[12px] font-[600] text-black/80 dark:text-white/80">{name}</span>
              </div>
              <div className="w-[70px] shrink-0 px-3 py-3">
                <span className="text-[12px] font-mono text-black/50 dark:text-white/40 px-2 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08]">
                  {weight}
                </span>
              </div>
              <div className="flex-1 px-3 py-3 min-w-0 overflow-hidden">
                <span
                  className="text-[17px] text-black/80 dark:text-white/80 whitespace-nowrap"
                  data-font-preview
                  className="font-preview-span"
                  style={{ "--font-preview": cssVar, "--fp-weight": String(weight) } as React.CSSProperties}
                >
                  {isMono ? 'const token = "design-system";' : sampleTextWeight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
