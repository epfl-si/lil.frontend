import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {ArrowLeft, QrCode as BarcodeIcon, ShelvingUnit, Trash2} from "lucide-react";
import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import {Details} from "@/components/form/Details.tsx";
import {fetchStorageDetails} from "@/lib/graphql/fetchingTools.ts";
import type {ShelfType, StorageType, UserType} from "@/lib/types.tsx";
import {Shelf} from "@/components/form/Shelf.tsx";
import {Button} from "@/components/ui/button.tsx";
import {deleteStorage, restoreStorage} from "@/lib/graphql/postingTools.ts";
import {Undo} from "@/components/parts/Undo.tsx";

export const BarcodeDetailPage = ({ oidc, connectedUser }: { oidc: State, connectedUser: UserType }) => {
  const { t } = useTranslation();
  const { barcode } = useParams();
  const [details, setDetails] = useState<StorageType | undefined>();
  const [shelves, setShelves] = useState<ShelfType[]>(details ? details.shelves : []);

  useEffect(() => {
    if (barcode) {
      loadDetails();
    }
  }, [oidc.accessToken, barcode, connectedUser]);

  const loadDetails = async () => {
    const response = await fetchStorageDetails(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {
        barcode,
        isAdmin: connectedUser.isAdmin
      }
    );
    if (response.status === 200 && response.data) {
      setDetails(response.data);
      setShelves(response.data.shelves);
    }
  };

  const undoDeletion = async () => {
    const response = await restoreStorage(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      await loadDetails()
    }
  };

  const onDeleteStorage = async () => {
    const response = await deleteStorage(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      await loadDetails();
    }
  };

  return (
    <div>
      <Button className="mb-6" variant="outline" size="lg" asChild>
        <Link to="/" >
          <ArrowLeft />
          {t('app.backToStorage')}
        </Link>
      </Button>

      <div className={`flex items-center gap-3 mb-6 ${details?.deletedBy ? 'line-through opacity-50' : ''}`}>
        <div className="bg-[#f0f0f0] rounded-[12px] h-10 w-10 flex items-center justify-center">
          <ShelvingUnit size={24} />
        </div>
        <BarcodeIcon size={22} color="#212121" />
        <h1 className="text-2xl sm:text-3xl font-bold">
          {details ? details.barcode : t("app.addNewLocation")}
        </h1>
      </div>

      <div className="space-y-4">
        {details && (
          <div className="flex items-center gap-3">
            <Button className="primary-buttons"
              variant="outline"
              size="lg"
              disabled={!!details?.deletedBy}
              onClick={onDeleteStorage}
            >
              <Trash2 />
              {t('app.deleteStorage')}
            </Button>
            {details?.deletedBy && (
              <>
                <p className="text-red-500 text-sm font-medium">{t("app.storageDeleted")}</p>
                <Undo title={t("app.storageDeleted")} undoDeletion={undoDeletion} isIcon={true} />
              </>
            )}
          </div>
        )}

        <Details oidc={oidc} details={details} />
        {!details ? <></> :
          <div>
            <hr className="border-gray-200 mb-4" />
            <Shelf oidc={oidc} shelves={shelves} storage={details} load={loadDetails}/>
          </div>
        }
      </div>
    </div>
  );
};
