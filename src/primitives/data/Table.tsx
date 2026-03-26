import { type CSSProperties } from "react";

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
  return (
    <div className={`prim-table-wrap ${className}`} style={style}>
      <table className="prim-table" data-compact={compact || undefined}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="prim-table-th"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="prim-table-tr"
              data-striped={striped || undefined}
            >
              {columns.map((col) => (
                <td key={col.key} className="prim-table-td">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
