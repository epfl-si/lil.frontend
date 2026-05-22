import type {State} from "@epfl-si/react-appauth";
import type {ActiveFilters, StorageType, UserType} from "@/lib/types.tsx";
import {Filters} from "@/components/parts/filters.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Save} from "lucide-react";
import {useTranslation} from "react-i18next";
import {saveStorage} from "@/lib/graphql/postingTools.ts";
import {useNavigate} from "react-router";

export const Details = ({ oidc, details, connectedUser, activeFilters, setActiveFilters }: {
  oidc: State,
  details: StorageType | undefined,
  connectedUser: UserType,
  activeFilters: ActiveFilters,
  setActiveFilters: (filters: (prev) => ActiveFilters) => void
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFilterChange = (key: keyof ActiveFilters, value: string | boolean) => {
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
    <div>
      { activeFilters && <Filters oidc={oidc} activeFilters={activeFilters} onFilterChange={handleFilterChange} isCascading={true} disable={!!details}/>}
      {!details && !connectedUser.isReadOnly &&
          <Button
            variant="outline"
            size="lg"
            className="primary-buttons mt-4"
            onClick={onSaveStorage}
          >
            <Save />
            {t('app.saveStorage')}
          </Button>}
    </div>
  );
};
