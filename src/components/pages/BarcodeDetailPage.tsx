import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {ArrowLeft, ListPlus} from "lucide-react";
import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import {Details} from "@/components/form/Details.tsx";
import {fetchStorageDetails} from "@/lib/graphql/fetchingTools.ts";
import type {ShelfType, StorageType} from "@/lib/types.tsx";
import {Shelf} from "@/components/form/Shelf.tsx";
import {Button} from "@/components/ui/button.tsx";
import {createShelf} from "@/lib/graphql/postingTools.ts";

export const BarcodeDetailPage = ({ oidc }: { oidc: State }) => {
  const { t } = useTranslation();
  const { barcode } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<StorageType | undefined>();
  const [shelves, setShelves] = useState<ShelfType[]>(details ? details.shelves : []);

  useEffect(() => {
    if (barcode) {
      loadDetails();
    }
  }, [oidc.accessToken, barcode]);

  const loadDetails = async () => {
    setIsLoading(true);
    const response = await fetchStorageDetails(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.data) {
      setDetails(response.data);
      setShelves(response.data.shelves);
    }
    setIsLoading(false);
  };

  const onAddShelf = async () => {
    setIsLoading(true);
    if (details) {
      const response = await createShelf(
        import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
        oidc.accessToken,
        {parentBarcode: details.barcode}
      );
      if (response.status === 200 && response.barcode) {
        setShelves([...shelves, {barcode: response.barcode, boxes: []}]);
      }
    } else {

    }
    setIsLoading(false);
  };

  return (
    <div className="p-8 w-full">
      <Link to={`/`} className="mb-6">
        <div className="backDiv">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('app.backToStorage')}
        </div>
      </Link>
      {isLoading ? t('app.loadingData') :
        <div>
          <div className="title">{details ? details.barcode : t("app.addNewLocation")}</div>
          <Details oidc={oidc} details={details} />
          <Shelf oidc={oidc} shelves={shelves} setIsLoading={setIsLoading}
                 setShelves={setShelves} />
          <Button
            variant="outline"
            size="lg"
            className="primary-buttons"
            onClick={onAddShelf}
          >
            <ListPlus />
            {t('app.addNewShelf')}
          </Button>
        </div>
      }
    </div>
  );
};
