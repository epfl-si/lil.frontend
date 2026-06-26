import {useEffect, useState, useMemo} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import {Link, useNavigate, useSearchParams} from "react-router";
import {Plus as AddIcon} from "lucide-react";
import type {State} from "@epfl-si/react-appauth";
import type {ActiveFilters, FetchStoragesType, NotificationType, StorageType, UserType} from "@/lib/types.tsx";
import {fetchStorage} from "@/lib/graphql/fetchingTools.ts";
import {useTranslation} from "react-i18next";
import {Filters} from "@/components/parts/filters.tsx";
import {SortableHeader} from "@/components/parts/sortableHeader";
import {Button} from "@/components/ui/button.tsx";
import {handleResponse} from "@/lib/graphql/utils.ts";
import {MessageAlert} from "@/components/parts/MessageAlert.tsx";
import {ExportCsvButton} from "@/components/parts/exportCSVButton";

type SortKey = keyof StorageType;

export const StorageTable = ({ oidc, connectedUser }: { oidc: State, connectedUser: UserType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [storages, setStorages] = useState<StorageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null);

  const [searchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState<number>(0);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10));
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    roomType: "",
    productType: "",
    storageType: "",
    storageSubType: "",
  });
  const [notification, setNotification] = useState<NotificationType>({visible: "invisible"})

  useEffect(() => {
    loadStorages();
  }, [
    oidc.accessToken,
    currentPage,
    sortConfig,
    activeFilters,
    connectedUser
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
        searchTerm: activeFilters.searchTerm,
      }
    );
    await handleResponse(response, setNotification, loadTable, response);
    setIsLoading(false);
  };

  const loadTable = (response: FetchStoragesType) => {
    setStorages(response.data);
    setTotalCount(response.totalCount);
  }

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
  const handleFilterChange = <K extends keyof ActiveFilters>(key: K, value: ActiveFilters[K]) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value}));
    setCurrentPage(1);
  }

  const showDeleted = connectedUser.isAdmin;

const handleCsvDownload = async () => {
    const response = await fetchStorage(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {
        page: 1,
        pageSize: totalCount,
      }
    );

    if (!response || !response.data) return [];

    return response.data.map((storage: StorageType) => ({
      room: storage.roomDisplay,
      roomType: `${t(`roomType.${storage.roomType.symbol}`)} (${storage.roomType.shortName})`,
      productType: `${t(`productType.${storage.productType.symbol}`)} (${storage.productType.shortName})`,
      storageType: `${t(`storageType.${storage.storageType.symbol}`)} (${storage.storageType.shortName})`,
      storageSubType: `${t(`storageSubType.${storage.storageSubType.symbol}`)} (${storage.storageSubType.shortName})`,
      barcode: storage.barcode,
      createdOn: new Date(storage.createdOn).toLocaleDateString('fr-CH'),
      createdBy: storage.createdBy,
      deletedOn: storage.deletedOn ? new Date(storage.deletedOn).toLocaleDateString('fr-CH') : "",
      deletedBy: storage.deletedBy || "",
    }));
  };
  const csvColumns = useMemo(() => [
    { key: "room" as const, label: t('app.room') },
    { key: "roomType" as const, label: t('app.roomType') },
    { key: "productType" as const, label: t('app.productType') },
    { key: "storageType" as const, label: t('app.storageType') },
    { key: "storageSubType" as const, label: t('app.storageSubType') },
    { key: "barcode" as const, label: t('app.barcodeHeader') },
    { key: "createdOn" as const, label: t('app.createdOn') },
    { key: "createdBy" as const, label: t('app.createdBy') },
    ...(showDeleted ? [
      { key: "deletedOn" as const, label: t('app.deletedOn') },
      { key: "deletedBy" as const, label: t('app.deletedBy') }
    ] : [])
  ], [t, showDeleted]);

  return (
    <div>
      <MessageAlert notification={notification} close={() => {setNotification({visible: "invisible"})}} />
      <div  className={`${notification.visible == 'visible' ? 'opacity-50' : ''}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t('app.storageFacilityManagement')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('app.manageYourLocation')}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              {!connectedUser.isReadOnly && <Button
                variant="outline"
                size="lg"
                className="primary-buttons"
                onClick={() => navigate("/code/new")}
              >
                <AddIcon/>
                {t('app.addNewLocation')}
              </Button>}
            </div>
            <div>
              <ExportCsvButton
                fetchData={handleCsvDownload}
                columns={csvColumns}
                filename="export_stockage_lil_epfl"
                setNotification={setNotification}
              />
            </div>
          </div>
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
                  <SortableHeader label={t('app.barcodeHeader')} sortKey="barcode" sortConfig={sortConfig} handleSort={handleSort}/>
                  <TableHead>{t('app.shelvesAndBoxesHeader')}</TableHead>
                  <SortableHeader label={t('app.createdHeader')} sortKey="createdOn" sortConfig={sortConfig} handleSort={handleSort}/>
                  {showDeleted &&
                    <SortableHeader label={t('app.deletedHeader')} sortKey="deletedOn" sortConfig={sortConfig} handleSort={handleSort}/>
                  }
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={showDeleted ? 10 : 9} className="text-center py-8">{t('app.loadingData')}</TableCell>
                  </TableRow>
                ) : storages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={showDeleted ? 10 : 9} className="text-center py-8 text-gray-500">{t('app.noStorageCurrentlyAvailable')}</TableCell>
                  </TableRow>
                ) : (
                  storages.map((storage, index) => (
                    <TableRow className={`${storage.deletedBy ? 'bg-red-100 hover:bg-red-200/70' : ''}`} key={index}>
                      <TableCell>{storage.roomDisplay}</TableCell>
                      <TableCell>{t(`roomType.${storage.roomType.symbol}`)} ({storage.roomType.shortName})</TableCell>
                      <TableCell>{t(`productType.${storage.productType.symbol}`)} ({storage.productType.shortName})</TableCell>
                      <TableCell>{t(`storageType.${storage.storageType.symbol}`)} ({storage.storageType.shortName})</TableCell>
                      <TableCell>{t(`storageSubType.${storage.storageSubType.symbol}`)} ({storage.storageSubType.shortName})</TableCell>
                      <TableCell>
                        <Link
                          to={`/code/${storage.barcode}`}
                          className={`text-blue-600 hover:underline cursor-pointer ${storage.deletedBy ? 'line-through' : ''}`}
                        >
                          {storage.barcode}
                        </Link>
                      </TableCell>
                      <TableCell className={`${storage.deletedBy ? 'line-through' : ''}`}>
                        {storage.shelves?.map((shelf) => (
                          <div className={`${storage.deletedBy ? '' : shelf.deletedBy ? 'line-through bg-red-100' : ''}`} key={shelf.barcode}>
                            {shelf.barcode}
                            {shelf.boxes?.map((box) => (
                              <div className={`${storage.deletedBy ? '' : box.deletedBy ? 'line-through bg-red-100' : ''}`} key={box.barcode}>{box.barcode}</div>
                            ))}
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        <span>{new Date(storage.createdOn).toLocaleDateString('fr-CH')}</span><br />
                        <span className="text-gray-500">{storage.createdBy}</span>
                      </TableCell>
                      {showDeleted &&
                        <TableCell>
                          {storage.deletedBy && storage.deletedOn &&
                            <div>
                              <span>{new Date(storage.deletedOn).toLocaleDateString('fr-CH')}</span><br />
                              <span className="text-gray-500">{storage.deletedBy}</span>
                            </div>
                          }
                        </TableCell>
                      }
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
      </div>
    </div>
  );
};
