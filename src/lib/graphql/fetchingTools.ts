import {doGraphQL} from "./utils.ts";

export const fetchConnectedUser = async (
  address: string | undefined,
  authToken: string | undefined
): Promise<any> => {
  const query = `query connection {
						connectedUserInfo {
							groups
							username
							isAdmin
						}
					}`;

  console.log(query);
  const result = await doGraphQL(query, {}, address, authToken);
  debugger
  return {
    status: result.status,
    data: result.data?.connectedUserInfo,
    errors: result.errors
  };
};
