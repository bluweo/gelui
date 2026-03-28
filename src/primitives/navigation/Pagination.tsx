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

  const pageBtnBase = [
    "inline-flex items-center justify-center min-w-8 h-8 px-2",
    "border-none rounded-[var(--glass-radius-pill,100px)]",
    "cursor-pointer text-[13px] font-medium font-[family-name:var(--font-ui)]",
    "transition-all duration-200",
    "backdrop-blur-[12px]",
    "hover:scale-110",
  ].join(" ");

  const pages = getVisiblePages();

  return (
    <nav
      className={`flex items-center gap-1 ${className}`}
      style={style}
    >
      {/* Prev arrow */}
      <button
        className={`${pageBtnBase} bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:bg-[var(--theme-fg)] hover:text-[var(--theme-fg-on-solid)] ${currentPage <= 1 ? "opacity-40 cursor-default pointer-events-none" : ""}`}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      {/* Page numbers */}
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
              pageBtnBase,
              page === currentPage
                ? "bg-[var(--theme-bg-solid)] text-[var(--theme-fg-on-solid)]"
                : "bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:bg-[var(--theme-fg)] hover:text-[var(--theme-fg-on-solid)]",
            ].join(" ")}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}

      {/* Next arrow */}
      <button
        className={`${pageBtnBase} bg-[var(--theme-header-bg)] text-[var(--theme-fg-muted)] hover:bg-[var(--theme-fg)] hover:text-[var(--theme-fg-on-solid)] ${currentPage >= totalPages ? "opacity-40 cursor-default pointer-events-none" : ""}`}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
    </nav>
  );
}
