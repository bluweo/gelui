import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
  className?: string;
  style?: CSSProperties;
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  maxVisible = 5,
  className = "",
  style,
}: PaginationProps) {
  const dark = useDarkMode();

  const getVisiblePages = (): (number | "ellipsis")[] => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "ellipsis")[] = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    if (currentPage <= half + 1) {
      end = maxVisible - 1;
    }
    if (currentPage >= totalPages - half) {
      start = totalPages - maxVisible + 2;
    }

    pages.push(1);
    if (start > 2) pages.push("ellipsis");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const buttonBase: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "32px",
    height: "32px",
    padding: "0 8px",
    border: "none",
    borderRadius: "var(--glass-radius-pill, 100px)",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "var(--font-ui)",
    transition: "background 0.15s, opacity 0.15s",
  };

  const navButton: CSSProperties = {
    ...buttonBase,
    background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
    color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  const pageButton = (active: boolean): CSSProperties => ({
    ...buttonBase,
    background: active
      ? dark
        ? "rgba(255,255,255,0.9)"
        : "rgba(0,0,0,0.85)"
      : dark
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.05)",
    color: active
      ? dark
        ? "#000"
        : "#fff"
      : dark
        ? "rgba(255,255,255,0.7)"
        : "rgba(0,0,0,0.6)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  });

  const pages = getVisiblePages();

  return (
    <nav
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        ...style,
      }}
    >
      <button
        style={{
          ...navButton,
          opacity: currentPage <= 1 ? 0.4 : 1,
          cursor: currentPage <= 1 ? "default" : "pointer",
        }}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &#8249; Prev
      </button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            style={{
              minWidth: "32px",
              textAlign: "center",
              fontSize: "13px",
              color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
            }}
          >
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            style={pageButton(page === currentPage)}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}

      <button
        style={{
          ...navButton,
          opacity: currentPage >= totalPages ? 0.4 : 1,
          cursor: currentPage >= totalPages ? "default" : "pointer",
        }}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next &#8250;
      </button>
    </nav>
  );
}
