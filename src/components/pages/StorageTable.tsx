import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import {Link, useSearchParams} from "react-router";
import type {State} from "@epfl-si/react-appauth";
import type {StorageType} from "@/lib/types.tsx";
import {fetchStorage} from "@/lib/graphql/fetchingTools.ts";
import { useTranslation } from 'react-i18next';

export const StorageTable = ({ oidc }: { oidc: State }) => {
  const { t, i18n } = useTranslation();
  const [storages, setStorages] = useState<StorageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const [totalPages, setTotalPages] = useState<number>(0);
  const paginatedStorages = storages.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));


  useEffect(() => {
    loadStorages();
  }, [oidc.accessToken]); // Recharge si le token change

  const loadStorages = async () => {
    setIsLoading(true);
    const response = await fetchStorage(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken
    );
    if (response.status === 200 && response.data) {
      setStorages(response.data);
      setTotalPages(Math.max(1, Math.ceil(storages.length / itemsPerPage)));
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('app.storage')}</TableHead>
              <TableHead>{t('app.room')}</TableHead>
              <TableHead>{t('app.roomType')}</TableHead>
              <TableHead>{t('app.productType')}</TableHead>
              <TableHead>{t('app.storageType')}</TableHead>
              <TableHead>{t('app.storageSubType')}</TableHead>
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
              paginatedStorages.map((storage, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Link
                      to={`/code/${storage.barcode}`}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {storage.barcode}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    {storage.roomDisplay}
                  </TableCell>
                  <TableCell className="font-medium">
                    {storage.roomType.name} ({storage.roomType.shortName})
                  </TableCell>
                  <TableCell className="font-medium">
                    {storage.productType.name} ({storage.productType.shortName})
                  </TableCell>
                  <TableCell className="font-medium">
                    {storage.storageType.name} ({storage.storageType.shortName})
                  </TableCell>
                  <TableCell className="font-medium">
                    {storage.storageSubType.name} ({storage.storageSubType.shortName})
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
              <PaginationPrevious
                onClick={goToPreviousPage}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            <PaginationItem>
              <span className="text-sm text-gray-600 px-4">
                                                            {t('app.PageCurrentOfTotal', { currentPage: currentPage, totalPages: totalPages })}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={goToNextPage}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
