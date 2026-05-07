import type {State} from '@epfl-si/react-appauth';
import {useTranslation} from 'react-i18next';
import {fetchProductType, fetchRoomType, fetchStorageSubType, fetchStorageType} from "@/lib/graphql/fetchingTools.ts";
import {useEffect, useState} from "react";
import {FilterSelect} from "@/components/parts/filterSelect.tsx";
import type {Type} from "@/lib/types.tsx";

export const Filters = ({ oidc }: { oidc: State }) => {
  const { t } = useTranslation();
  const [roomTypes, setRoomTypes] = useState<Type[]>([]);
  const [roomType, setRoomType] = useState<Type>();
  const [productTypes, setProductTypes] = useState<Type[]>([]);
  const [productType, setProductType] = useState<Type>();
  const [storageTypes, setStorageTypes] = useState<Type[]>([]);
  const [storageType, setStorageType] = useState<Type>();
  const [storageSubTypes, setStorageSubTypes] = useState<Type[]>([]);
  const [storageSubType, setStorageSubType] = useState<Type>();

  useEffect(() => {
    loadRoomType();
    loadProductType();
    loadStorageType();
    loadSubstorageType();
  }, [oidc.accessToken]); // Recharge si le token change

  const loadRoomType = async () => {
    const response = await fetchRoomType(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken
    );
    if (response.status === 200 && response.data) {
      setRoomTypes(response.data);
    }
  };

  const loadProductType = async () => {
    const response = await fetchProductType(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken
    );
    if (response.status === 200 && response.data) {
      setProductTypes(response.data);
    }
  };

  const loadStorageType = async () => {
    const response = await fetchStorageType(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken
    );
    if (response.status === 200 && response.data) {
      setStorageTypes(response.data);
    }
  };

  const loadSubstorageType = async () => {
    const response = await fetchStorageSubType(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken
    );
    if (response.status === 200 && response.data) {
      setStorageSubTypes(response.data);
    }
  };

  const onSelectRoomType = (selectedValue: string) => {
    const rt = roomTypes.find(rt => rt.symbol === selectedValue);
    setRoomType(rt);
    console.log(rt);
  }

  const onSelectProductType = (selectedValue: string) => {
    const rt = productTypes.find(rt => rt.symbol === selectedValue);
    setProductType(rt);
    console.log(rt);
  }

  const onSelectStorageType = (selectedValue: string) => {
    const rt = storageTypes.find(rt => rt.symbol === selectedValue);
    setStorageType(rt);
    console.log(rt);
  }

  const onSelectSubstorageType = (selectedValue: string) => {
    const rt = storageSubTypes.find(rt => rt.symbol === selectedValue);
    setStorageSubType(rt);
    console.log(rt);
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
      <FilterSelect placeholder={t("app.roomType")} data={roomTypes} value={roomType?.symbol ?? null}
                    setValue={onSelectRoomType} listName={'roomType'} />
      <FilterSelect placeholder={t("app.productType")} data={productTypes} value={productType?.symbol ?? null}
                    setValue={onSelectProductType} listName={'productType'} />
      <FilterSelect placeholder={t("app.storageType")} data={storageTypes} value={storageType?.symbol ?? null}
                    setValue={onSelectStorageType} listName={'storageType'} />
      <FilterSelect placeholder={t("app.storageSubType")} data={storageSubTypes} value={storageSubType?.symbol ?? null}
                    setValue={onSelectSubstorageType} listName={'storageSubType'} />
    </div>
  );
};
