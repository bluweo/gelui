import { Box, Stack, Inline, Center, Spacer, Grid } from "@/primitives/layout";
import { useState, useRef, useEffect } from "react";

export function LayoutShowcase() {
  const [activeGap, setActiveGap] = useState<"8px" | "16px">("8px");
  const [activeCols, setActiveCols] = useState<1 | 2 | 3>(3);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [resizeW, setResizeW] = useState(100); // percentage

  const placeholderBg = "var(--theme-divider)";
  const dashedBorder = "var(--theme-ghost-border)";

  const Placeholder = ({ w = "64px", h = "12px" }: { w?: string; h?: string }) => (
    <Box style={{ width: w, height: h, borderRadius: "4px", background: placeholderBg }} />
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Stack (Vertical) */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-4 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Stack (Vertical)</span>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-header-bg)]">
            <span className="text-xs font-medium text-[var(--theme-fg)]">gap: 8px</span>
            <Stack gap="8px">
              <Placeholder w="64px" h="12px" />
              <Placeholder w="64px" h="12px" />
              <Placeholder w="64px" h="12px" />
            </Stack>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--theme-fg)]">gap: 16px</span>
            <Stack gap="16px">
              <Placeholder w="64px" h="12px" />
              <Placeholder w="64px" h="12px" />
              <Placeholder w="64px" h="12px" />
            </Stack>
          </div>
        </div>
      </div>

      {/* Inline (Horizontal) */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-4 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Inline (Horizontal)</span>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-header-bg)]">
            <span className="text-xs font-medium text-[var(--theme-fg)]">gap: 8px</span>
            <Inline gap="8px">
              <Placeholder w="32px" h="24px" />
              <Placeholder w="32px" h="24px" />
              <Placeholder w="32px" h="24px" />
            </Inline>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--theme-fg)]">gap: 16px</span>
            <Inline gap="16px">
              <Placeholder w="32px" h="24px" />
              <Placeholder w="32px" h="24px" />
              <Placeholder w="32px" h="24px" />
            </Inline>
          </div>
        </div>
      </div>

      {/* Center & Spacer */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-4 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Center & Spacer</span>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-header-bg)]">
            <span className="text-xs font-medium text-[var(--theme-fg)]">Center</span>
            <Center style={{ width: "112px", height: "48px", borderRadius: "var(--glass-radius-sm, 10px)", border: `1px dashed ${dashedBorder}` }}>
              <Placeholder w="24px" h="24px" />
            </Center>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--theme-fg)]">Spacer</span>
            <Inline gap="0px" style={{ width: "112px", height: "32px", borderRadius: "var(--glass-radius-sm, 10px)", border: `1px dashed ${dashedBorder}`, paddingTop: 0, paddingBottom: 0, paddingLeft: 6, paddingRight: 6 }}>
              <Placeholder w="16px" h="16px" />
              <Spacer style={{ height: "auto", flex: 1 }} />
              <span className="text-[8px] font-mono text-[var(--theme-fg-faint)]">
                &#x2194;
              </span>
              <Spacer style={{ height: "auto", flex: 1 }} />
              <Placeholder w="16px" h="16px" />
            </Inline>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-4 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)] flex items-center justify-between">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Grid</span>
          <div className="flex gap-1">
            {(["8px", "16px"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setActiveGap(g)}
                className={`text-[9px] font-semibold py-[3px] px-2 rounded-[var(--glass-radius-pill)] text-[var(--theme-fg)] cursor-pointer ${activeGap === g ? "border border-[var(--theme-fg-faint)] bg-[var(--theme-header-bg)]" : "border border-[var(--theme-divider)] bg-transparent"}`}
              >
                gap: {g}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <Grid cols={3} gap={activeGap}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Box
                key={i}
                className="h-10 rounded-[var(--glass-radius-sm)] bg-[var(--theme-divider)] flex items-center justify-center"
              >
                <span className="text-[9px] font-mono text-[var(--theme-fg-faint)]">{i + 1}</span>
              </Box>
            ))}
          </Grid>
        </div>
      </div>
      {/* Responsive Columns */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-4 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)] flex items-center justify-between">
          <span className="text-[10px] font-[650] tracking-[0.06em] uppercase text-[var(--theme-fg-muted)]">Responsive Columns</span>
          <div className="flex gap-1">
            {([1, 2, 3] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActiveCols(c)}
                className={`text-[9px] font-semibold py-[3px] px-2 rounded-[var(--glass-radius-pill)] text-[var(--theme-fg)] cursor-pointer ${activeCols === c ? "border border-[var(--theme-fg-faint)] bg-[var(--theme-header-bg)]" : "border border-[var(--theme-divider)] bg-transparent"}`}
              >
                {c} col{c > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <Grid cols={activeCols} gap="8px">
            {Array.from({ length: 6 }).map((_, i) => (
              <Box
                key={i}
                className="h-8 rounded-[6px] bg-[var(--theme-divider)] flex items-center justify-center transition-all duration-300"
              >
                <span className="text-[9px] font-mono text-[var(--theme-fg-faint)]">{i + 1}</span>
              </Box>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
