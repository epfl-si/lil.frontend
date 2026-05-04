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

interface StorageTableProps {
  storages: any[];
  isLoading: boolean;
}

export const StorageTable = ({ storages, isLoading }: StorageTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const itemsPerPage = 15;
  const totalPages = Math.max(1, Math.ceil(storages.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStorages = storages.slice(startIndex, startIndex + itemsPerPage);
  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  return (
    <div className="space-y-4">
      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Barcode</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8">Chargement des données...</TableCell>
              </TableRow>
            ) : storages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8 text-gray-500">Aucun Storage actuellement.</TableCell>
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
                                                             Page {currentPage} sur {totalPages}
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
