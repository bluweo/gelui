import { useState } from "react";
import type { CSSProperties } from "react";
import { Table } from "@/primitives/data";
import { SearchInput } from "@/primitives/inputs";
import { Pagination } from "@/primitives/navigation";
import { Badge } from "@/primitives/data";
import { Heading } from "@/primitives/typography";
import { Button } from "@/primitives/buttons";
import { Stack, Inline } from "@/primitives/layout";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  title?: string;
  columns: Column[];
  data: Record<string, string | number>[];
  searchPlaceholder?: string;
  actionLabel?: string;
  onAction?: () => void;
  pageSize?: number;
  className?: string;
  style?: CSSProperties;
}

export function DataTable({
  title,
  columns,
  data,
  searchPlaceholder = "Search...",
  actionLabel,
  onAction,
  pageSize = 5,
  className = "",
  style,
}: DataTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = data.filter((row) =>
    Object.values(row).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={`w-full ${className}`} style={style}>
      <Stack gap="16px">
        <Inline justify="between" align="center" className="max-[540px]:flex-col max-[540px]:gap-3 max-[540px]:items-stretch">
          {title && <Heading level={3}>{title}</Heading>}
          <Inline gap="8px" align="center">
            <SearchInput
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-[220px] max-[540px]:w-full"
            />
            {actionLabel && (
              <Button variant="solid" size="sm" onClick={onAction}>{actionLabel}</Button>
            )}
          </Inline>
        </Inline>

        <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] overflow-hidden border border-[var(--theme-divider)]">
          <Table columns={columns} data={paged} />
        </div>

        {totalPages > 1 && (
          <Inline justify="end">
            <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
          </Inline>
        )}
      </Stack>
    </div>
  );
}
