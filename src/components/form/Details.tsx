import type {State} from "@epfl-si/react-appauth";
import type {StorageType} from "@/lib/types.tsx";
import {useEffect, useState} from "react";
import {Filters} from "@/components/parts/filters.tsx";
import type {ActiveFilters} from "@/components/pages/StorageTable.tsx";

export const Details = ({ oidc, details }: { oidc: State, details: StorageType | undefined }) => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    roomType: details?.roomType.symbol,
    productType: details?.productType.symbol,
    storageType: details?.storageType.symbol,
    storageSubType: details?.storageSubType.symbol,
  });

  useEffect(() => {
  }, [oidc.accessToken, details]);

  const handleFilterChange = (key: keyof ActiveFilters, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value}));
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
      { activeFilters && <Filters oidc={oidc} activeFilters={activeFilters} onFilterChange={handleFilterChange} isCascading={true} />}
    </div>
  );
};
