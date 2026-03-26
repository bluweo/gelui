import { type CSSProperties } from "react";

interface BreadcrumbProps {
  items?: string[];
  className?: string;
  style?: CSSProperties;
}

export function Breadcrumb({
  items = ["Home", "Page"],
  className = "",
  style,
}: BreadcrumbProps) {
  return (
    <nav
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {i > 0 && (
            <span style={{ opacity: 0.3, color: "var(--theme-fg)" }}>
              /
            </span>
          )}
          <span
            style={{
              fontWeight: i === items.length - 1 ? 600 : 400,
              opacity: i === items.length - 1 ? 1 : 0.5,
              cursor: i < items.length - 1 ? "pointer" : "default",
              color: "var(--theme-fg)",
            }}
          >
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
}
