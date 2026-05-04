import {doGraphQL} from "./utils.ts";
import type {FetchStoragesType, FetchUserType} from "@/lib/types.tsx";

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
  authToken: string | undefined
): Promise<FetchStoragesType> => {
  const query = `query getStorage {
    storages {
      barcode
      createdBy
      deletedBy
      roomDisplay
    }
  }`;
  const result = await doGraphQL(query, {}, address, authToken);
  return {
    status: result.status,
    data: result.data?.storages,
    errors: result.errors
  };
};
