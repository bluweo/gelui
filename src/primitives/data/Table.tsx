import { type CSSProperties, useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface TableProps {
  columns: { key: string; label: string; width?: string }[];
  data: Record<string, any>[];
  striped?: boolean;
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Table({
  columns,
  data,
  striped = false,
  compact = false,
  className = "",
  style,
}: TableProps) {
  const dark = useDarkMode();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const cellPadding = compact ? "8px 12px" : "12px 16px";

  return (
    <div
      className={className}
      style={{
        borderRadius: "var(--glass-radius-sm, 10px)",
        overflow: "hidden",
        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        background: dark ? "rgba(20,20,20,1)" : "rgba(255,255,255,1)",
        ...style,
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-body)",
          fontSize: compact ? "12px" : "13px",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: cellPadding,
                  textAlign: "left",
                  fontSize: "11px",
                  fontWeight: 600,
                  fontFamily: "var(--font-ui)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
                  borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                  background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                  width: col.width,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            const isStriped = striped && i % 2 === 1;
            const isHovered = hoveredRow === i;
            let bg = "transparent";
            if (isHovered) {
              bg = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)";
            } else if (isStriped) {
              bg = dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.015)";
            }

            return (
              <tr
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{ background: bg, transition: "background 120ms ease" }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: cellPadding,
                      color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                      borderBottom:
                        i < data.length - 1
                          ? `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`
                          : "none",
                    }}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
