import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import type {ShelfType} from "@/lib/types.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Box} from "@/components/form/Box.tsx";
import {createBox, deleteShelf} from "@/lib/graphql/postingTools.ts";
import {ListPlus} from "lucide-react";
import {Alert} from "@/components/parts/Alert.tsx";

export const Shelf = ({ oidc, shelves, setShelves }: {
  oidc: State,
  shelves: ShelfType[],
  setShelves: (shelves: ShelfType[]) => void,
}) => {
  const { t } = useTranslation();

  const onAddBox = async (parentBarcode: string) => {
    const response = await createBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {parentBarcode}
    );
    if (response.status === 200 && response.barcode) {
      const newShelves = shelves.map(sh => {
        if (sh.barcode === parentBarcode) {
          sh.boxes.push({barcode: response.barcode});
          return sh;
        } else
          return sh;
      });
      setShelves([...newShelves]);
    }
  };

  const onDeleteShelf = async (barcode: string) => {
    const response = await deleteShelf(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      setShelves([...shelves.filter(sh => sh.barcode !== barcode)]);
    }
  };

  return (
    <div>
      {shelves.map(shelf =>
        <Card size="sm" className="mx-auto w-full max-w-sm" key={shelf.barcode}>
          <CardHeader>
            <CardTitle>{shelf.barcode}</CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Box oidc={oidc} boxes={shelf.boxes} shelf={shelf.barcode} shelves={shelves}
                 setShelves={setShelves} />
          </CardContent>
          <CardFooter className="left-div">
            <Alert title={t("app.deleteShelfTitle", {barcode: shelf.barcode})}
                   onSubmit={() => onDeleteShelf(shelf.barcode)} tooltip={t("app.deleteShelf")}/>
            <span title={t("app.addNewBox")}>
              <ListPlus onClick={() => onAddBox(shelf.barcode)} />
            </span>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
