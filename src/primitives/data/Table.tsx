import { type CSSProperties, useState } from "react";

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
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const cellPadding = compact ? "8px 12px" : "12px 16px";

  return (
    <div
      className={className}
      style={{
        borderRadius: "var(--glass-radius-sm, 10px)",
        overflow: "hidden",
        border: `1px solid var(--theme-divider)`,
        background: "var(--theme-table-bg)",
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
                  color: "var(--theme-fg-subtle)",
                  borderBottom: `1px solid var(--theme-divider)`,
                  background: "var(--theme-header-bg)",
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
              bg = "var(--theme-header-bg)";
            } else if (isStriped) {
              bg = "var(--theme-header-bg)";
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
                      color: "var(--theme-fg)",
                      borderBottom:
                        i < data.length - 1
                          ? `1px solid var(--theme-divider)`
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
