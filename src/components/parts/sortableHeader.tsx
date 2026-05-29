import { TableHead } from "@/components/ui/table.tsx";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { StorageType } from "@/lib/types.tsx";
type SortKey = keyof StorageType;

export interface SortableHeaderProps {
  label: string;
  sortKey: SortKey;
  sortConfig: { key: SortKey; direction: "asc" | "desc" } | null;
  handleSort: (key: SortKey) => void;
}

export const SortableHeader = ({
  label,
  sortKey,
  sortConfig,
  handleSort,
}: SortableHeaderProps) => (
  <TableHead
    onClick={() => handleSort(sortKey)}
    className="cursor-pointer select-none hover:bg-slate-50 transition-colors"
  >
    <div className="flex items-center gap-2">
      {label}
      {sortConfig?.key === sortKey ? (
        sortConfig.direction === "asc" ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        )
      ) : (
        <ArrowUpDown className="w-4 h-4 opacity-30" />
      )}
    </div>
  </TableHead>
);
