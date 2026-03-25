import { Box, Stack, Inline, Center, Spacer, Grid } from "@/primitives/layout";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function LayoutShowcase() {
  const isDark = useDarkMode();
  const [activeGap, setActiveGap] = useState<"8px" | "16px">("8px");

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const placeholderBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const dashedBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)";

  const headerStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 650,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: headerColor,
  };

  const tableStyle: React.CSSProperties = {
    borderRadius: "var(--glass-radius-sm, 10px)",
    overflow: "hidden",
    background: tableBg,
    border: `1px solid ${borderColor}`,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 500,
    color: labelColor,
  };

  const Placeholder = ({ w = "64px", h = "12px" }: { w?: string; h?: string }) => (
    <Box style={{ width: w, height: h, borderRadius: "4px", background: placeholderBg }} />
  );

  return (
    <div suppressHydrationWarning style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Stack (Vertical) */}
      <div style={tableStyle}>
        <div style={{ padding: "10px 16px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Stack (Vertical)</span>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "12px", borderBottom: `1px solid ${rowBorder}` }}>
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
        <div style={{ padding: "10px 16px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Inline (Horizontal)</span>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "12px", borderBottom: `1px solid ${rowBorder}` }}>
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
        <div style={{ padding: "10px 16px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={headerStyle}>Center & Spacer</span>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "12px", borderBottom: `1px solid ${rowBorder}` }}>
            <span style={labelStyle}>Center</span>
            <Center style={{ width: "112px", height: "48px", borderRadius: "var(--glass-radius-sm, 10px)", border: `1px dashed ${dashedBorder}` }}>
              <Placeholder w="24px" h="24px" />
            </Center>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={labelStyle}>Spacer</span>
            <Inline gap="0px" style={{ width: "112px", height: "32px", borderRadius: "var(--glass-radius-sm, 10px)", border: `1px dashed ${dashedBorder}`, padding: "0 6px" }}>
              <Placeholder w="16px" h="16px" />
              <Spacer style={{ height: "auto", flex: 1 }} />
              <span style={{ fontSize: "8px", fontFamily: "var(--font-mono)", color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)" }}>
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
        <div style={{ padding: "10px 16px", background: headerBg, borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={headerStyle}>Grid</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {(["8px", "16px"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setActiveGap(g)}
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: "var(--glass-radius-pill, 100px)",
                  border: `1px solid ${activeGap === g ? (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)") : borderColor}`,
                  background: activeGap === g ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)") : "transparent",
                  color: labelColor,
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
                <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)" }}>{i + 1}</span>
              </Box>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
