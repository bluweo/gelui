import { type CSSProperties } from "react";

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

  const navBtnClass = [
    "inline-flex items-center justify-center min-w-8 h-8 px-2",
    "border-none rounded-[var(--glass-radius-pill,100px)]",
    "cursor-pointer text-[13px] font-medium font-[family-name:var(--font-ui)]",
    "transition-[background,opacity] duration-150",
    "bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)]",
    "backdrop-blur-[12px]",
  ].join(" ");

  const pages = getVisiblePages();

  return (
    <nav
      className={`flex items-center gap-1 ${className}`}
      style={style}
    >
      <button
        className={`${navBtnClass} ${currentPage <= 1 ? "opacity-40 cursor-default" : ""}`}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &#8249; Prev
      </button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="min-w-8 text-center text-[13px] text-[var(--theme-fg-subtle)]"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            data-active={page === currentPage || undefined}
            className={[
              "inline-flex items-center justify-center min-w-8 h-8 px-2",
              "border-none rounded-[var(--glass-radius-pill,100px)]",
              "cursor-pointer text-[13px] font-medium font-[family-name:var(--font-ui)]",
              "transition-[background,opacity] duration-150",
              "backdrop-blur-[12px]",
              page === currentPage
                ? "bg-[var(--theme-bg-solid)] text-[var(--theme-fg-on-solid)]"
                : "bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)]",
            ].join(" ")}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={`${navBtnClass} ${currentPage >= totalPages ? "opacity-40 cursor-default" : ""}`}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next &#8250;
      </button>
    </nav>
  );
}
