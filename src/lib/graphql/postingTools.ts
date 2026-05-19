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

export const undeleteShelf = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string
  }
): Promise<DeleteBarcodeType> => {
  const query = `mutation UndeleteShelf ( $barcode: String ) {
      undeleteShelf ( barcode: $barcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    deleted: result.data?.undeleteShelf,
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

export const undeleteBox = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string
  }
): Promise<DeleteBarcodeType> => {
  const query = `mutation UndeleteBox ( $barcode: String ) {
      undeleteBox ( barcode: $barcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    deleted: result.data?.undeleteBox,
    errors: result.errors
  };
};

export const undeleteStorage = async (
  address: string | undefined,
  authToken: string | undefined,
  variables: {
    barcode: string
  }
): Promise<DeleteBarcodeType> => {
  const query = `mutation UndeleteStorage ( $barcode: String ) {
      undeleteStorage ( barcode: $barcode )
  }`;

  const result = await doGraphQL(query, variables, address, authToken);
  return {
    status: result.status,
    deleted: result.data?.undeleteStorage,
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
  console.log(result)
  return {
    status: result.status,
    deleted: result.data?.deleteStorage,
    errors: result.errors
  };
};
