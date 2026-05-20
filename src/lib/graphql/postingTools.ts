import type {DeleteBarcodeType, PostBarcodeType} from "@/lib/types.tsx";
import {doGraphQL} from "@/lib/graphql/utils.ts";

export const createShelf = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    parentBarcode: string
  }
): Promise<PostBarcodeType> => {
  const query = `mutation createShelf ( $parentBarcode: String ) {
      createShelf ( parentBarcode: $parentBarcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    barcode: result.data?.createShelf,
    errors: result.errors
  };
};

export const createBox = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    parentBarcode: string
  }
): Promise<PostBarcodeType> => {
  const query = `mutation CreateBox ( $parentBarcode: String ) {
      createBox ( parentBarcode: $parentBarcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    barcode: result.data?.createBox,
    errors: result.errors
  };
};

export const deleteShelf = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string
  }
): Promise<DeleteBarcodeType> => {
  const query = `mutation DeleteShelf ( $barcode: String ) {
      deleteShelf ( barcode: $barcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    deleted: result.data?.deleteShelf,
    errors: result.errors
  };
};

export const restoreShelf = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string
  }
): Promise<DeleteBarcodeType> => {
  const query = `mutation RestoreShelf ( $barcode: String ) {
      restoreShelf ( barcode: $barcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    deleted: result.data?.restoreShelf,
    errors: result.errors
  };
};

export const deleteBox = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string
  }
): Promise<DeleteBarcodeType> => {
  const query = `mutation DeleteBox ( $barcode: String ) {
      deleteBox ( barcode: $barcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    deleted: result.data?.deleteBox,
    errors: result.errors
  };
};

export const restoreBox = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string
  }
): Promise<DeleteBarcodeType> => {
  const query = `mutation RestoreBox ( $barcode: String ) {
      restoreBox ( barcode: $barcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    deleted: result.data?.restoreBox,
    errors: result.errors
  };
};

export const restoreStorage = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string
  }
): Promise<DeleteBarcodeType> => {
  const query = `mutation RestoreStorage ( $barcode: String ) {
      restoreStorage ( barcode: $barcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    deleted: result.data?.restoreStorage,
    errors: result.errors
  };
};

export const deleteStorage = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string
  }
): Promise<DeleteBarcodeType> => {
  const query = `mutation DeleteStorage ( $barcode: String ) {
      deleteStorage ( barcode: $barcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    deleted: result.data?.deleteStorage,
    errors: result.errors
  };
};

export const saveStorage = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    roomId: number,
    roomDisplay: string,
    roomType: string,
    productType: string,
    storageType: string,
    storageSubType: string,
  }
): Promise<PostBarcodeType> => {
  const query = `mutation CreateStorage (
    $productType: String,
     $roomDisplay: String,
     $roomId: Int,
     $roomType: String,
     $storageSubType: String,
     $storageType: String,
  ) {
    createStorage (
        productType: $productType
        roomDisplay: $roomDisplay
        roomId: $roomId
        roomType: $roomType
        storageSubType: $storageSubType
        storageType: $storageType
    )
}`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    barcode: result.data?.createStorage,
    errors: result.errors
  };
};
