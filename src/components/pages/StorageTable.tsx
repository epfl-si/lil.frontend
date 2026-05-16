import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import {Link, useSearchParams} from "react-router";
import {ArrowDown, ArrowUp, ArrowUpDown} from "lucide-react";
import type {State} from "@epfl-si/react-appauth";
import type {StorageType} from "@/lib/types.tsx";
import {fetchStorage} from "@/lib/graphql/fetchingTools.ts";
import {useTranslation} from "react-i18next";
import {Filters} from "@/components/parts/filters.tsx";

type SortKey = keyof StorageType;

export interface ActiveFilters {
  roomType?: string;
  productType?: string;
  storageType?: string;
  storageSubType?: string;
}

interface SortableHeaderProps {
  label: string;
  sortKey: SortKey;
  sortConfig: { key: SortKey; direction: "asc" | "desc" } | null;
  handleSort: (key: SortKey) => void;
}

const SortableHeader = ({
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

export const StorageTable = ({ oidc }: { oidc: State }) => {
  const { t, i18n } = useTranslation();
  const [storages, setStorages] = useState<StorageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null);

  const [searchParams] = useSearchParams();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    roomType: "",
    productType: "",
    storageType: "",
    storageSubType: "",
  });

  useEffect(() => {
    loadStorages();
  }, [
    oidc.accessToken,
    currentPage,
    sortConfig,
    activeFilters
  ]);

  const loadStorages = async () => {
    setIsLoading(true);
    const response = await fetchStorage(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {
        page: currentPage,
        pageSize: itemsPerPage,
        sortField: sortConfig?.key,
        sortDirection: sortConfig?.direction,
        roomTypeSymbol: activeFilters.roomType,
        productTypeSymbol: activeFilters.productType,
        storageTypeSymbol: activeFilters.storageType,
        storageSubTypeSymbol: activeFilters.storageSubType,
      }
    );
    if (response.status === 200 && response.data) {
      setStorages(response.data);
      setTotalCount(response.totalCount);
    }
    setIsLoading(false);
  };


  const [totalCount, setTotalCount] = useState<number>(0);
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  // SORT HANDLER
  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => {
      if (prev?.key === key) return prev.direction === "asc" ? { key, direction: "desc" } : null;
      return { key, direction: "asc" };
    });
    setCurrentPage(1);
  };

  // Drop down filtering handler
  const handleFilterChange = (key: keyof ActiveFilters, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value}));
    setCurrentPage(1);
  }

  return (
    <div className="space-y-4">
      <Filters oidc={oidc} activeFilters={activeFilters} onFilterChange={handleFilterChange} isCascading={false} />
      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader label={t('app.room')} sortKey="roomDisplay" sortConfig={sortConfig} handleSort={handleSort}/>
              <SortableHeader label={t('app.roomType')} sortKey="roomType" sortConfig={sortConfig} handleSort={handleSort}/>
              <SortableHeader label={t('app.productType')} sortKey="productType" sortConfig={sortConfig} handleSort={handleSort}/>
              <SortableHeader label={t('app.storageType')} sortKey="storageType" sortConfig={sortConfig} handleSort={handleSort}/>
              <SortableHeader label={t('app.storageSubType')} sortKey="storageSubType" sortConfig={sortConfig} handleSort={handleSort}/>
              <SortableHeader label={t('app.storage')} sortKey="barcode" sortConfig={sortConfig} handleSort={handleSort}/>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">{t('app.loadingData')}</TableCell>
              </TableRow>
            ) : storages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">{t('app.noStorageCurrentlyAvailable')}</TableCell>
              </TableRow>
            ) : (
              storages.map((storage, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{storage.roomDisplay}</TableCell>
                  <TableCell className="font-medium">{t(`roomType.${storage.roomType.symbol}`)} ({storage.roomType.shortName})</TableCell>
                  <TableCell className="font-medium">{t(`productType.${storage.productType.symbol}`)} ({storage.productType.shortName})</TableCell>
                  <TableCell className="font-medium">{t(`storageType.${storage.storageType.symbol}`)} ({storage.storageType.shortName})</TableCell>
                  <TableCell className="font-medium">{t(`storageSubType.${storage.storageSubType.symbol}`)} ({storage.storageSubType.shortName})
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      to={`/code/${storage.barcode}`}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {storage.barcode}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    ...
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && storages.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={goToPreviousPage} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm text-gray-600 px-4">
                {t('app.PageCurrentOfTotal', { currentPage: currentPage, totalPages: totalPages })}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={goToNextPage} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
