import type {NotificationType} from "@/lib/types.tsx";
import {t} from "i18next";

export async function doGraphQL(
	query: string,
	variables: Object,
	address: string | undefined,
	authToken: string | undefined): Promise<any> {
	const results =
		typeof address === 'string'
			? await fetch(address, {
				headers: {
					accept: '*/*',
					'content-type': 'application/json',
					'sec-fetch-dest': 'empty',
					'sec-fetch-mode': 'cors',
					'sec-fetch-site': 'cross-site',
					authorization: `Bearer ${authToken}`,
				},
				referrerPolicy: 'no-referrer-when-downgrade',
				body: JSON.stringify({
					query,
					variables
				}),
				method: 'POST',
				mode: 'cors',
				credentials: 'omit',
			})
			: null;

	if (results?.status !== 200) {
		return { status: results?.status, data: await results?.text() };
	}

	const graphQLResponse = await results.json();

	return {
		status: results.status,
		data: graphQLResponse.data,
		errors: graphQLResponse.errors
	};
}

export async function handleResponse(
  response: any,
  setNotification: (notification: NotificationType) => void,
  callBack: (...args: any) => void,
  ...callBackArgs: any
) {
  const errorList: string[] = response.errors ? response.errors.map((err) => typeof err === 'string' ? err : err.message) : [];

  if (errorList.length > 0) {
    setNotification({visible: "visible", body: errorList.join('\n'), title: t("app.error"), variant: "destructive"});
  } else {
    callBack(...callBackArgs);
  }
}
