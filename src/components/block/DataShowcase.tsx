import { Table, Stat, EmptyState, ColorSwatch } from "@/primitives/data";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function DataShowcase() {
  const isDark = useDarkMode();
  const [showEmpty, setShowEmpty] = useState(true);

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";

  const tableColumns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  const tableData = [
    { name: "Alice Chen", role: "Engineer", status: "Active" },
    { name: "Bob Smith", role: "Designer", status: "Away" },
    { name: "Carol Wu", role: "PM", status: "Active" },
    { name: "Dan Lee", role: "DevOps", status: "Offline" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Table */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Table (Striped)</span>
        </div>
        <div style={{ padding: "16px" }}>
          <Table columns={tableColumns} data={tableData} striped />
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Stat Cards</span>
        </div>
        <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          <Stat
            value="1,234"
            label="Users"
            trend="up"
            trendValue="+12%"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            }
          />
          <Stat
            value="98.5%"
            label="Uptime"
            trend="neutral"
            trendValue="0.0%"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
          />
          <Stat
            value="$12.4k"
            label="Revenue"
            trend="up"
            trendValue="+8.3%"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            }
          />
        </div>
      </div>

      {/* EmptyState */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Empty State</span>
        </div>
        <EmptyState
          title="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          }
          action={
            <button
              onClick={() => setShowEmpty(!showEmpty)}
              style={{
                padding: "8px 20px",
                borderRadius: "var(--glass-radius-pill, 100px)",
                border: "none",
                background: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
                color: isDark ? "#000" : "#fff",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "var(--font-ui)",
                cursor: "pointer",
              }}
            >
              Clear Filters
            </button>
          }
        />
      </div>

      {/* ColorSwatch */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Color Swatches</span>
        </div>
        <div style={{ padding: "16px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <ColorSwatch color="#007AFF" label="Primary" showHex />
          <ColorSwatch color="#34C759" label="Success" showHex />
          <ColorSwatch color="#FF9500" label="Warning" showHex />
          <ColorSwatch color="#FF3B30" label="Error" showHex />
          <ColorSwatch color="#5856D6" label="Accent" showHex />
          <ColorSwatch color="#8E8E93" label="Neutral" showHex />
        </div>
      </div>
    </div>
  );
}
