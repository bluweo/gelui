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
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
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
                "text-[var(--theme-fg)] transition-all duration-150",
                isLast
                  ? "font-semibold opacity-100 cursor-default"
                  : "font-normal opacity-50 cursor-pointer hover:opacity-80 hover:underline underline-offset-2",
              ].join(" ")}
            >
              {item}
            </span>
          </span>
        );
      })}
    </nav>
  );
}
