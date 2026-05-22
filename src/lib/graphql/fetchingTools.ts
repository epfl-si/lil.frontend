import {doGraphQL} from "./utils.ts";
import type {FetchAllowedType, FetchStoragesType, FetchStorageType, FetchType, FetchUserType} from "@/lib/types.tsx";

export const fetchConnectedUser = async (
  address: string | undefined,
  authToken: string | undefined
): Promise<FetchUserType> => {
  const query = `query connection {
    connectedUserInfo {
      groups
      username
      isAdmin
      isReadOnly
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
    roomDisplay?: string;
    searchTerm?: string;
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
    $roomDisplay: String
    $searchTerm: String
  ) {
    storages(
      roomTypeSymbol: $roomTypeSymbol,
      productTypeSymbol: $productTypeSymbol,
      storageTypeSymbol: $storageTypeSymbol,
      storageSubTypeSymbol: $storageSubTypeSymbol,
      page: $page,
      pageSize: $pageSize,
      sortField: $sortField,
      sortDirection: $sortDirection,
      roomDisplay: $roomDisplay
      searchTerm: $searchTerm
    ) {
      totalCount
      storages {
        barcode
        createdBy
        createdOn
        deletedBy
        deletedOn
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
        shelves {
          barcode
          deletedBy
          boxes {
            barcode
            deletedBy
          }
        }
      }
    }
  }`;
  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    data: result.data?.storages?.storages ?? [],
    totalCount: result.data?.storages?.totalCount ?? 0,
    errors: result.errors
  };
};

export const fetchStorageDetails = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string,
  }
): Promise<FetchStorageType> => {
  const query = `query getStorage ( $barcode: String ) {
    storage ( barcode: $barcode ) {
      barcode
      createdBy
      createdOn
      deletedBy
      deletedOn
      roomDisplay
      productType {
        shortName
        symbol
      }
      roomType {
        shortName
        symbol
      }
      shelves {
        barcode
        createdBy
        createdOn
        deletedBy
        deletedOn
        boxes {
          barcode
          createdBy
          createdOn
          deletedBy
          deletedOn
        }
      }
      storageSubType {
        shortName
        symbol
      }
      storageType {
        shortName
        symbol
      }
    }
  }`;
  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    data: result.data?.storage,
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
  const hasFilters = roomSymbol && productSymbol;

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
    room: roomSymbol,
    product: productSymbol
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
  const hasFilters = roomSymbol && productSymbol && storageSymbol;

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
    room: roomSymbol,
    product: productSymbol,
    storage: storageSymbol
  } : {};

  const result = await doGraphQL(query, variables, address, authToken);
  return { status: result.status, data: result.data?.storageSubTypes, errors: result.errors };
};

export const fetchAllowedTypeValue = async (
  address: string | undefined,
  authToken: string | undefined,
  roomSymbol: string,
  productSymbol: string,
  storageSymbol: string,
  subStorageSymbol: string
): Promise<FetchAllowedType> => {
  const query = `query getAllowedTypeValue($room: String, $product: String, $storage: String, $subStorage: String) {
        allowedTypeValue(roomSymbol: $room, productSymbol: $product, storageSymbol: $storage, subStorageSymbol: $subStorage) {
          allowsBoxes
          allowsShelves
        }
      }`;

  const variables = {
    room: roomSymbol,
    product: productSymbol,
    storage: storageSymbol,
    subStorage: subStorageSymbol
  };

  const result = await doGraphQL(query, variables, address, authToken);
  return { status: result.status, data: result.data?.allowedTypeValue, errors: result.errors };
};

export const fetchStorageSuggestions = async (
  address: string | undefined,
  authToken: string | undefined,
  field: string,
  searchText: string
): Promise<{ status: number; data: string[]; errors: any }> => {

  const query = `query getSuggestions($field: String!, $text: String!) {
    suggestStorage(field: $field, searchText: $text)
  }`;

  const variables = {
    field: field,
    text: searchText
  };

  const result = await doGraphQL(query, variables, address, authToken);

  return {
    status: result.status,
    data: result.data?.suggestStorage || [],
    errors: result.errors
  };
};

export const fetchRoomApiSuggestions = async (
  address: string | undefined,
  authToken: string | undefined,
  roomSearch: string
): Promise<{ status: number; data: string[]; errors: any }> => {

  const query = `query getRoomApiSuggestions($roomSearch: String!) {
    suggestRoomApi(roomSearch: $roomSearch)
  }`;

  const variables = {
    roomSearch: roomSearch
  };

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    data: result.data?.suggestRoomApi || [],
    errors: result.errors
  };
};
