import {doGraphQL} from "./utils.ts";
import type {FetchType, FetchStoragesType, FetchUserType} from "@/lib/types.tsx";

export const fetchConnectedUser = async (
  address: string | undefined,
  authToken: string | undefined
): Promise<FetchUserType> => {
  const query = `query connection {
    connectedUserInfo {
      groups
      username
      isAdmin
    }
  }`;

  const result = await doGraphQL(query, {}, address, authToken);
  return {
    status: result.status,
    data: result.data?.connectedUserInfo,
    errors: result.errors
  };
};

export const fetchStorage = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    roomTypeSymbol?: string;
    productTypeSymbol?: string;
    storageTypeSymbol?: string;
    storageSubTypeSymbol?: string;
    page?: number;
    pageSize?: number;
    sortField?: string;
    sortDirection?: string;
  }
): Promise<FetchStoragesType> => {
  const query = `query getStorage (
    $roomTypeSymbol: String,
    $productTypeSymbol: String,
    $storageTypeSymbol: String,
    $storageSubTypeSymbol: String,
    $page: Int,
    $pageSize: Int,
    $sortField: String,
    $sortDirection: String
  ) {
    storages(
      roomTypeSymbol: $roomTypeSymbol,
      productTypeSymbol: $productTypeSymbol,
      storageTypeSymbol: $storageTypeSymbol,
      storageSubTypeSymbol: $storageSubTypeSymbol,
      page: $page,
      pageSize: $pageSize,
      sortField: $sortField,
      sortDirection: $sortDirection
    ) {
      barcode
      createdBy
      deletedBy
      roomDisplay
      roomType {
        shortName
        symbol
      }
      productType {
        shortName
        symbol
      }
      storageType {
        shortName
        symbol
      }
      storageSubType {
        shortName
        symbol
      }
    }
  }`;
  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    data: result.data?.storages,
    errors: result.errors
  };
};

export const fetchRoomType = async (
  address: string | undefined,
  authToken: string | undefined
): Promise<FetchType> => {
  const query = `query getRoomType {
    roomTypes {
        shortName
        symbol
    }
  }`;
  const result = await doGraphQL(query, {}, address, authToken);
  return {
    status: result.status,
    data: result.data?.roomTypes,
    errors: result.errors
  };
};

export const fetchProductType = async (
  address: string | undefined,
  authToken: string | undefined,
  roomTypeShortName?: string
): Promise<FetchType> => {

  const query = roomTypeShortName
    ? `query getProductTypeFiltered($room: String) {
        productTypes(roomTypeShortName: $room) {
          shortName
          symbol
        }
      }`
    : `query getProductType {
        productTypes {
          shortName
          symbol
        }
      }`;

  const variables = roomTypeShortName ? { room: roomTypeShortName } : {};

  const result = await doGraphQL(query, variables, address, authToken);

  return {
    status: result.status,
    data: result.data?.productTypes,
    errors: result.errors
  };
};

export const fetchStorageType = async (
  address: string | undefined,
  authToken: string | undefined,
  roomTypeShortName?: string,
  productTypeShortName?: string
): Promise<FetchType> => {

  const hasFilters = roomTypeShortName || productTypeShortName;

  const query = hasFilters
    ? `query getStorageTypesFiltered($room: String, $product: String) {
        storageTypes(
          roomTypeShortName: $room,
          productTypeShortName: $product
        ) {
          shortName
          symbol
        }
      }`
    : `query getStorageTypes {
        storageTypes {
          shortName
          symbol
        }
      }`;

  const variables = hasFilters ? {
    room: roomTypeShortName || undefined,
    product: productTypeShortName || undefined
  } : {};

  const result = await doGraphQL(query, variables, address, authToken);

  return {
    status: result.status,
    data: result.data?.storageTypes,
    errors: result.errors
  };
};

export const fetchStorageSubType = async (
  address: string | undefined,
  authToken: string | undefined,
  roomTypeShortName?: string,
  productTypeShortName?: string,
  storageTypeShortName?: string
): Promise<FetchType> => {

  const hasFilters = roomTypeShortName || productTypeShortName || storageTypeShortName;

  const query = hasFilters
    ? `query getStorageSubTypesFiltered($room: String, $product: String, $storage: String) {
        storageSubTypes(
          roomTypeShortName: $room,
          productTypeShortName: $product,
          storageTypeShortName: $storage
        ) {
          shortName
          symbol
        }
      }`
    : `query getStorageSubTypes {
        storageSubTypes {
          shortName
          symbol
        }
      }`;

  const variables = hasFilters ? {
    room: roomTypeShortName || undefined,
    product: productTypeShortName || undefined,
    storage: storageTypeShortName || undefined
  } : {};

  const result = await doGraphQL(query, variables, address, authToken);

  return {
    status: result.status,
    data: result.data?.storageSubTypes,
    errors: result.errors
  };
};
