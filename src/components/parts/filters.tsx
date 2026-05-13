import type {State} from '@epfl-si/react-appauth';
import {useTranslation} from 'react-i18next';
import {fetchProductType, fetchRoomType, fetchStorageSubType, fetchStorageType} from "@/lib/graphql/fetchingTools.ts";
import {useEffect, useState} from "react";
import {FilterSelect} from "@/components/parts/filterSelect.tsx";
import type {Type} from "@/lib/types.tsx";

export interface ActiveFilters {
  roomType?: string;
  productType?: string;
  storageType?: string;
  storageSubType?: string;
}

interface FilterOptions {
  roomType: Type[];
  productType: Type[];
  storageType: Type[];
  storageSubType: Type[];
}

interface Props {
  oidc: State;
  activeFilters: ActiveFilters;
  onFilterChange: (key: keyof ActiveFilters, value: string) => void;
  isCascading?: boolean;
}

export const Filters = ({ oidc, activeFilters, onFilterChange, isCascading = false }: Props) => {
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
      const selectedRoom = options.roomType.find(r => r.symbol === val);
      if (selectedRoom?.shortName) {
        const res = await fetchProductType(baseUrl, token, selectedRoom.shortName);
        setOptions(prev => ({ ...prev, productType: res.data || [] }));
      }
    }
  };

  const handleProductChange = async (val: string) => {
    onFilterChange('productType', val);
    if (!isCascading) return;

    onFilterChange('storageType', "");
    onFilterChange('storageSubType', "");
    setOptions(prev => ({ ...prev, storageType: [], storageSubType: [] }));

    if (val && activeFilters.roomType) {
      const room = options.roomType.find(r => r.symbol === activeFilters.roomType)?.shortName;
      const product = options.productType.find(p => p.symbol === val)?.shortName;
      if (room && product) {
        const res = await fetchStorageType(baseUrl, token, room, product);
        setOptions(prev => ({ ...prev, storageType: res.data || [] }));
      }
    }
  };

  const handleStorageChange = async (val: string) => {
    onFilterChange('storageType', val);
    if (!isCascading) return;

    onFilterChange('storageSubType', "");
    setOptions(prev => ({ ...prev, storageSubType: [] }));

    if (val && activeFilters.roomType && activeFilters.productType) {
      const room = options.roomType.find(r => r.symbol === activeFilters.roomType)?.shortName;
      const product = options.productType.find(p => p.symbol === activeFilters.productType)?.shortName;
      const storage = options.storageType.find(s => s.symbol === val)?.shortName;
      if (room && product && storage) {
        const res = await fetchStorageSubType(baseUrl, token, room, product, storage);
        setOptions(prev => ({ ...prev, storageSubType: res.data || [] }));
      }
    }
  };

  const handleSubStorageChange = (val: string) => {
    onFilterChange('storageSubType', val);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", gap: "16px" }}>
      <FilterSelect placeholder={t('app.roomType')} data={options.roomType} value={activeFilters.roomType || null} setValue={handleRoomChange} listName="roomType" />
      <FilterSelect placeholder={t('app.productType')} data={options.productType} value={activeFilters.productType || null} setValue={handleProductChange} listName="productType" />
      <FilterSelect placeholder={t('app.storageType')} data={options.storageType} value={activeFilters.storageType || null} setValue={handleStorageChange} listName="storageType" />
      <FilterSelect placeholder={t('app.storageSubType')} data={options.storageSubType} value={activeFilters.storageSubType || null} setValue={handleSubStorageChange} listName="storageSubType" />
    </div>
  );
};
