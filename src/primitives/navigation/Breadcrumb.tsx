import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  const dark = useDarkMode();
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
            <span style={{ opacity: 0.3, color: dark ? "#fff" : "#000" }}>
              /
            </span>
          )}
          <span
            style={{
              fontWeight: i === items.length - 1 ? 600 : 400,
              opacity: i === items.length - 1 ? 1 : 0.5,
              cursor: i < items.length - 1 ? "pointer" : "default",
              color: dark ? "#fff" : "#000",
            }}
          >
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
}
