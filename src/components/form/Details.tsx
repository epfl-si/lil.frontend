import type {State} from "@epfl-si/react-appauth";
import type {ActiveFilters, NotificationType, StorageType, UserType} from "@/lib/types.tsx";
import {Filters} from "@/components/parts/filters.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Save} from "lucide-react";
import {useTranslation} from "react-i18next";
import {saveStorage} from "@/lib/graphql/postingTools.ts";
import {useNavigate} from "react-router";
import {handleResponse} from "@/lib/graphql/utils.ts";

export const Details = ({ oidc, details, connectedUser, activeFilters, setActiveFilters, setNotification }: {
  oidc: State,
  details: StorageType | undefined,
  connectedUser: UserType,
  activeFilters: ActiveFilters,
  setActiveFilters: (filters: (prev) => ActiveFilters) => void,
  setNotification: (notification: NotificationType) => void
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleFilterChange = <K extends keyof ActiveFilters>(key: K, value: ActiveFilters[K]) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value}));
  }

  const onSaveStorage = async () => {
    if (!activeFilters.selectedRoomId ||
      !activeFilters.roomType ||
      !activeFilters.productType ||
      !activeFilters.storageType ||
      !activeFilters.storageSubType
    ) {
      setNotification({visible: 'visible', variant: "destructive", title: t("app.error"), body: t("app.valuesNotDefined")})
    } else {
      const response = await saveStorage(
        import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
        oidc.accessToken,
        {
          roomId: activeFilters.selectedRoomId,
          roomType: activeFilters.roomType,
          productType: activeFilters.productType,
          storageType: activeFilters.storageType,
          storageSubType: activeFilters.storageSubType,
        }
      );
      await handleResponse(response, setNotification, () => {navigate(`/code/${response.barcode}`);});
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
