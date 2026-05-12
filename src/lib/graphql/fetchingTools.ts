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
  authToken: string | undefined
): Promise<FetchType> => {
  const query = `query getProductType {
    productTypes {
        shortName
        symbol
    }
  }`;
  const result = await doGraphQL(query, {}, address, authToken);
  return {
    status: result.status,
    data: result.data?.productTypes,
    errors: result.errors
  };
};

export const fetchStorageType = async (
  address: string | undefined,
  authToken: string | undefined,
): Promise<FetchType> => {
  const query = `query getStorageTypes {
    storageTypes {
        shortName
        symbol
    }
  }`;
  const result = await doGraphQL(query, {}, address, authToken);
  return {
    status: result.status,
    data: result.data?.storageTypes,
    errors: result.errors
  };
};

export const fetchStorageSubType = async (
  address: string | undefined,
  authToken: string | undefined
): Promise<FetchType> => {
  const query = `query getStorageSubTypes {
    storageSubTypes {
        shortName
        symbol
    }
  }`;
  const result = await doGraphQL(query, {}, address, authToken);
  return {
    status: result.status,
    data: result.data?.storageSubTypes,
    errors: result.errors
  };
};
