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
import { fetchRoomApiSuggestions } from "@/lib/graphql/fetchingTools";
import { SearchFieldAutoComplete } from "@/components/parts/searchFieldAutoComplete";

interface Props {
  oidc: State;
  activeFilters: ActiveFilters;
  onFilterChange: <K extends keyof ActiveFilters>(key: K, value: ActiveFilters[K]) => void;
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

      onFilterChange('allowsBoxes', res.data?.allowsBoxes ?? false);
      onFilterChange('allowsShelves', res.data?.allowsShelves ?? false);
    }
  };

  const handleFetchRoomSuggestions = async (searchTerm: string) => {
    const res = await fetchRoomApiSuggestions(baseUrl, token, searchTerm);
    if (res.errors) {
      console.error("GraphQL error retrieving suggestions :", res.errors);
      return [];
    }
    if (!res.data) {
      return [];
    }
    return res.data;
  };

  return (
    <div>
    <div className="flex gap-4">
      {isCascading ?
      <SearchFieldAutoComplete<{ id: number; name: string }>
        placeholder={t("app.selectRoom")}
        value={activeFilters.searchTerm || ""}
        onChange={(val: string) => {
          onFilterChange('searchTerm', val)
          onFilterChange('selectedRoomId', undefined);
        }}
        isAutoComplete={true}
        fetchData={handleFetchRoomSuggestions}
        getDisplayValue={(room) => room.name}
        onSelectItem={(room) => {
          onFilterChange('selectedRoomId', room.id);
        }}
      />
        :
      <SearchFieldAutoComplete<string>
        placeholder={t("app.searchTerm")}
        value={activeFilters.searchTerm || ""}
        onChange={(val: any) => onFilterChange('searchTerm', val)}
        isAutoComplete={false}
        getDisplayValue={(item) => item}
      />
      }
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
