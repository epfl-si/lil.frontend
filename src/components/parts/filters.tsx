import type {State} from '@epfl-si/react-appauth';
import {useTranslation} from 'react-i18next';
import {fetchProductType, fetchRoomType, fetchStorageSubType, fetchStorageType} from "@/lib/graphql/fetchingTools.ts";
import {useEffect, useState} from "react";
import {FilterSelect} from "@/components/parts/filterSelect.tsx";
import type {Type} from "@/lib/types.tsx";
import type { ActiveFilters } from "@/components/pages/StorageTable"


interface FilterOptions {
  roomType: Type[];
  productType: Type[];
  storageType: Type[];
  storageSubType: Type[];
}

export const Filters = ({ oidc, activeFilters, onFilterChange }: { oidc: State, activeFilters: ActiveFilters, onFilterChange: (key: keyof ActiveFilters, value: string | null) => void }) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<FilterOptions>({
    roomType: [],
    productType: [],
    storageType: [],
    storageSubType: [],
  });

  const loadAllOptions = async () => {
    const baseUrl = import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL;
    const token = oidc.accessToken;

    const [rtRes, ptRes, stRes, sstRes] = await Promise.all([
      fetchRoomType(baseUrl, token),
      fetchProductType(baseUrl, token),
      fetchStorageType(baseUrl, token),
      fetchStorageSubType(baseUrl, token)
    ]);

    setOptions({
      roomType: rtRes.status === 200 ? rtRes.data || [] : [],
      productType: ptRes.status === 200 ? ptRes.data || [] : [],
      storageType: stRes.status === 200 ? stRes.data || [] : [],
      storageSubType: sstRes.status === 200 ? sstRes.data || [] : [],
    });
  };
  const filterConfigs: { key: keyof ActiveFilters; label: string }[] = [
    { key: 'roomType', label: 'app.roomType' },
    { key: 'productType', label: 'app.productType' },
    { key: 'storageType', label: 'app.storageType' },
    { key: 'storageSubType', label: 'app.storageSubType' },
  ];

  useEffect(() => {
    loadAllOptions();
  }, [oidc.accessToken]); // Recharge si le token change

  return (
    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
      {filterConfigs.map(({ key, label }) => (
          <FilterSelect
            placeholder={t(label)}
            data={options[key]}
            value={activeFilters[key]}
            setValue={(val) => onFilterChange(key, val)}
            listName={key}
          />
      ))}
    </div>
  );
};
