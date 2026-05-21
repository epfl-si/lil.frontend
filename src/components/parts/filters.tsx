import type {State} from '@epfl-si/react-appauth';
import {useTranslation} from 'react-i18next';
import {
  fetchAllowedTypeValue,
  fetchProductType,
  fetchRoomType,
  fetchStorageSubType,
  fetchStorageType
} from "@/lib/graphql/fetchingTools.ts";
import {useEffect, useState} from "react";
import {FilterSelect} from "@/components/parts/filterSelect.tsx";
import type {ActiveFilters, FilterOptions} from "@/lib/types.tsx";
import { fetchStorageSuggestions } from "@/lib/graphql/fetchingTools";
import { SearchFieldAutoComplete } from "@/components/parts/searchFieldAutoComplete";

interface Props {
  oidc: State;
  activeFilters: ActiveFilters;
  onFilterChange: (key: keyof ActiveFilters, value: string | boolean) => void;
  isCascading?: boolean;
  disable?: boolean;
}

export const Filters = ({ oidc, activeFilters, onFilterChange, isCascading = false, disable = false }: Props) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<FilterOptions>({
    roomType: [],
    productType: [],
    storageType: [],
    storageSubType: [],
  });

  const baseUrl = import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL;
  const token = oidc.accessToken;

  useEffect(() => {
    if (!isCascading) {
      Promise.all([
        fetchRoomType(baseUrl, token),
        fetchProductType(baseUrl, token),
        fetchStorageType(baseUrl, token),
        fetchStorageSubType(baseUrl, token)
      ]).then(([rtRes, ptRes, stRes, sstRes]) => {
        setOptions({
          roomType: rtRes.data || [],
          productType: ptRes.data || [],
          storageType: stRes.data || [],
          storageSubType: sstRes.data || [],
        });
      });
    } else {
      fetchRoomType(baseUrl, token).then(res => setOptions(prev => ({ ...prev, roomType: res.data || [] })));
    }
  }, [oidc.accessToken, isCascading])

  const handleRoomChange = async (val: string) => {
    onFilterChange('roomType', val);
    if (!isCascading) return;

    onFilterChange('productType', "");
    onFilterChange('storageType', "");
    onFilterChange('storageSubType', "");
    setOptions(prev => ({ ...prev, productType: [], storageType: [], storageSubType: [] }));

    if (val) {
      const res = await fetchProductType(baseUrl, token, val);
      setOptions(prev => ({ ...prev, productType: res.data || [] }));
    }
  };

  const handleProductChange = async (val: string) => {
    onFilterChange('productType', val);
    if (!isCascading) return;

    onFilterChange('storageType', "");
    onFilterChange('storageSubType', "");
    setOptions(prev => ({ ...prev, storageType: [], storageSubType: [] }));

    if (val && activeFilters.roomType) {
      const res = await fetchStorageType(baseUrl, token, activeFilters.roomType, val);
      setOptions(prev => ({ ...prev, storageType: res.data || [] }));
    }
  };

  const handleStorageChange = async (val: string) => {
    onFilterChange('storageType', val);
    if (!isCascading) return;

    onFilterChange('storageSubType', "");
    setOptions(prev => ({ ...prev, storageSubType: [] }));

    if (val && activeFilters.roomType && activeFilters.productType) {
      const res = await fetchStorageSubType(baseUrl, token, activeFilters.roomType, activeFilters.productType, val);
      setOptions(prev => ({ ...prev, storageSubType: res.data || [] }));
    }
  };

  const handleSubStorageChange = async (val: string) => {
    onFilterChange('storageSubType', val);

    if (val && activeFilters.roomType && activeFilters.productType && activeFilters.storageType) {
      const res = await fetchAllowedTypeValue(baseUrl, token, activeFilters.roomType, activeFilters.productType, activeFilters.storageType, val);

      onFilterChange('allowsBoxes', res.data.allowsBoxes);
      onFilterChange('allowsShelves', res.data.allowsShelves);
    }
  };

  return (
    <div>
    <div className="flex gap-4">
      <SearchFieldAutoComplete
        placeholder={t("app.searchRoom")}
        value={activeFilters.roomDisplay || ""}
        onChange={(val: any) => onFilterChange('roomDisplay', val)}

        fetchData={async (searchTerm: any) => {
          const res = await fetchStorageSuggestions(baseUrl, oidc.accessToken, 'roomDisplay', searchTerm);
          return res.data;
        }}
      />
    </div>
      {activeFilters && <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
        <FilterSelect placeholder={t('app.roomType')} data={options.roomType} value={activeFilters.roomType} setValue={handleRoomChange} listName="roomType" disable={disable}/>
        <FilterSelect placeholder={t('app.productType')} data={options.productType} value={activeFilters.productType} setValue={handleProductChange} listName="productType" disable={disable}/>
        <FilterSelect placeholder={t('app.storageType')} data={options.storageType} value={activeFilters.storageType} setValue={handleStorageChange} listName="storageType" disable={disable}/>
        <FilterSelect placeholder={t('app.storageSubType')} data={options.storageSubType} value={activeFilters.storageSubType} setValue={handleSubStorageChange} listName="storageSubType" disable={disable}/>
      </div>}
    </div>
  );
};
