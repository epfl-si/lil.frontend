import type {State} from "@epfl-si/react-appauth";
import type {StorageType} from "@/lib/types.tsx";
import {useState} from "react";
import {Filters} from "@/components/parts/filters.tsx";
import type {ActiveFilters} from "@/components/pages/StorageTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Save} from "lucide-react";
import {useTranslation} from "react-i18next";
import {saveStorage} from "@/lib/graphql/postingTools.ts";
import {useNavigate} from "react-router";

export const Details = ({ oidc, details }: { oidc: State, details: StorageType | undefined }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    roomType: details?.roomType.symbol,
    productType: details?.productType.symbol,
    storageType: details?.storageType.symbol,
    storageSubType: details?.storageSubType.symbol,
  });

  const handleFilterChange = (key: keyof ActiveFilters, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value}));
  }

  const onSaveStorage = async () => {
    const response = await saveStorage(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {
        roomDisplay: 'INN.033',
        roomId: 1234,
        roomType: activeFilters.roomType,
        productType: activeFilters.productType,
        storageType: activeFilters.storageType,
        storageSubType: activeFilters.storageSubType,
      }
    );
    if (response.status === 200 && response.barcode) {
      navigate(`/code/${response.barcode}`);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
      { activeFilters && <Filters oidc={oidc} activeFilters={activeFilters} onFilterChange={handleFilterChange} isCascading={true} disable={!!details}/>}
      {!details &&
          <Button
            variant="outline"
            size="lg"
            onClick={onSaveStorage}
          >
            <Save />
            {t('app.saveStorage')}
          </Button>}
    </div>
  );
};
