import { Box, Stack, Inline, Center, Spacer, Grid } from "@/primitives/layout";
import { useState } from "react";

export function LayoutShowcase() {
  const [activeGap, setActiveGap] = useState<"8px" | "16px">("8px");

  const headerStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 650,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--theme-fg-muted)",
  };

  const tableStyle: React.CSSProperties = {
    borderRadius: "var(--glass-radius-sm, 10px)",
    overflow: "hidden",
    background: "var(--theme-table-bg)",
    border: "1px solid var(--theme-divider)",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 500,
    color: "var(--theme-fg)",
  };

  const placeholderBg = "var(--theme-divider)";
  const dashedBorder = "var(--theme-ghost-border)";

  const Placeholder = ({ w = "64px", h = "12px" }: { w?: string; h?: string }) => (
    <Box style={{ width: w, height: h, borderRadius: "4px", background: placeholderBg }} />
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Stack (Vertical) */}
      <div style={tableStyle}>
        <div style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 16, paddingRight: 16, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span style={headerStyle}>Stack (Vertical)</span>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid var(--theme-header-bg)" }}>
            <span style={labelStyle}>gap: 8px</span>
            <Stack gap="8px">
              <Placeholder w="64px" h="12px" />
              <Placeholder w="64px" h="12px" />
              <Placeholder w="64px" h="12px" />
            </Stack>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={labelStyle}>gap: 16px</span>
            <Stack gap="16px">
              <Placeholder w="64px" h="12px" />
              <Placeholder w="64px" h="12px" />
              <Placeholder w="64px" h="12px" />
            </Stack>
          </div>
        </div>
      </div>

      {/* Inline (Horizontal) */}
      <div style={tableStyle}>
        <div style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 16, paddingRight: 16, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span style={headerStyle}>Inline (Horizontal)</span>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid var(--theme-header-bg)" }}>
            <span style={labelStyle}>gap: 8px</span>
            <Inline gap="8px">
              <Placeholder w="32px" h="24px" />
              <Placeholder w="32px" h="24px" />
              <Placeholder w="32px" h="24px" />
            </Inline>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={labelStyle}>gap: 16px</span>
            <Inline gap="16px">
              <Placeholder w="32px" h="24px" />
              <Placeholder w="32px" h="24px" />
              <Placeholder w="32px" h="24px" />
            </Inline>
          </div>
        </div>
      </div>

      {/* Center & Spacer */}
      <div style={tableStyle}>
        <div style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 16, paddingRight: 16, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)" }}>
          <span style={headerStyle}>Center & Spacer</span>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid var(--theme-header-bg)" }}>
            <span style={labelStyle}>Center</span>
            <Center style={{ width: "112px", height: "48px", borderRadius: "var(--glass-radius-sm, 10px)", border: `1px dashed ${dashedBorder}` }}>
              <Placeholder w="24px" h="24px" />
            </Center>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={labelStyle}>Spacer</span>
            <Inline gap="0px" style={{ width: "112px", height: "32px", borderRadius: "var(--glass-radius-sm, 10px)", border: `1px dashed ${dashedBorder}`, paddingTop: 0, paddingBottom: 0, paddingLeft: 6, paddingRight: 6 }}>
              <Placeholder w="16px" h="16px" />
              <Spacer style={{ height: "auto", flex: 1 }} />
              <span style={{ fontSize: "8px", fontFamily: "var(--font-mono)", color: "var(--theme-fg-faint)" }}>
                &#x2194;
              </span>
              <Spacer style={{ height: "auto", flex: 1 }} />
              <Placeholder w="16px" h="16px" />
            </Inline>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={tableStyle}>
        <div style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 16, paddingRight: 16, background: "var(--theme-header-bg)", borderBottom: "1px solid var(--theme-divider)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={headerStyle}>Grid</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {(["8px", "16px"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setActiveGap(g)}
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  paddingTop: 3, paddingBottom: 3, paddingLeft: 8, paddingRight: 8,
                  borderRadius: "var(--glass-radius-pill, 100px)",
                  border: `1px solid ${activeGap === g ? "var(--theme-fg-faint)" : "var(--theme-divider)"}`,
                  background: activeGap === g ? "var(--theme-header-bg)" : "transparent",
                  color: "var(--theme-fg)",
                  cursor: "pointer",
                }}
              >
                gap: {g}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          <Grid cols={3} gap={activeGap}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Box
                key={i}
                style={{
                  height: "40px",
                  borderRadius: "var(--glass-radius-sm, 10px)",
                  background: placeholderBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "var(--theme-fg-faint)" }}>{i + 1}</span>
              </Box>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
