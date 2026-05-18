import type {PostBarcodeType} from "@/lib/types.tsx";
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
