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
      totalCount
      storages {
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
    }
  }`;
  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    data: result.data?.storages.storages ?? [],
    totalCount: result.data?.storages.totalCount ?? 0,
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
  roomSymbol?: string
): Promise<FetchType> => {
  const query = roomSymbol
    ? `query getProductTypeFiltered($room: String) {
        productTypes(roomSymbol: $room) {
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

  const variables = roomSymbol ? { room: roomSymbol } : {};

  const result = await doGraphQL(query, variables, address, authToken);
  return { status: result.status, data: result.data?.productTypes, errors: result.errors };
};

export const fetchStorageType = async (
  address: string | undefined,
  authToken: string | undefined,
  roomSymbol?: string,
  productSymbol?: string
): Promise<FetchType> => {
  const hasFilters = roomSymbol || productSymbol;

  const query = hasFilters
    ? `query getStorageTypesFiltered($room: String, $product: String) {
        storageTypes(roomSymbol: $room, productSymbol: $product) {
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
    room: roomSymbol || undefined,
    product: productSymbol || undefined
  } : {};

  const result = await doGraphQL(query, variables, address, authToken);
  return { status: result.status, data: result.data?.storageTypes, errors: result.errors };
};

export const fetchStorageSubType = async (
  address: string | undefined,
  authToken: string | undefined,
  roomSymbol?: string,
  productSymbol?: string,
  storageSymbol?: string
): Promise<FetchType> => {
  const hasFilters = roomSymbol || productSymbol || storageSymbol;

  const query = hasFilters
    ? `query getStorageSubTypesFiltered($room: String, $product: String, $storage: String) {
        storageSubTypes(roomSymbol: $room, productSymbol: $product, storageSymbol: $storage) {
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
    room: roomSymbol || undefined,
    product: productSymbol || undefined,
    storage: storageSymbol || undefined
  } : {};

  const result = await doGraphQL(query, variables, address, authToken);
  return { status: result.status, data: result.data?.storageSubTypes, errors: result.errors };
};
