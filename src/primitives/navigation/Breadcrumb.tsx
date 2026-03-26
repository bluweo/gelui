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
      className={`flex items-center gap-2 text-[13px] ${className}`}
      style={style}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-2"
        >
          {i > 0 && (
            <span className="opacity-30 text-[var(--theme-fg)]">
              /
            </span>
          )}
          <span
            className={[
              "text-[var(--theme-fg)]",
              i === items.length - 1 ? "font-semibold opacity-100" : "font-normal opacity-50",
              i < items.length - 1 ? "cursor-pointer" : "cursor-default",
            ].join(" ")}
          >
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
}
