import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import type {ShelfType, StorageType} from "@/lib/types.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {Box} from "@/components/form/Box.tsx";
import {createBox, deleteShelf, restoreShelf} from "@/lib/graphql/postingTools.ts";
import {ListPlus, Trash2} from "lucide-react";
import {Alert} from "@/components/parts/Alert.tsx";
import {Undo} from "@/components/parts/Undo.tsx";

export const Shelf = ({ oidc, shelves, storage, load }: {
  oidc: State,
  shelves: ShelfType[],
  storage: StorageType,
  load: () => void
}) => {
  const { t } = useTranslation();
  const disabled = storage?.deletedBy !== null;

  const onAddBox = async (parentBarcode: string) => {
    const response = await createBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {parentBarcode}
    );
    if (response.status === 200 && response.barcode) {
      load();
    }
  };

  const onDeleteShelf = async (barcode: string) => {
    const response = await deleteShelf(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      load();
    }
  };

  const undoDeletion = async (barcode: string) => {
    const response = await restoreShelf(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      load();
    }
  };

  return (
    <div className="container">
      {shelves.map(shelf =>
        <Card size="sm" className="mx-auto w-full max-w-sm card" key={shelf.barcode}>
          <CardHeader>
            <CardTitle style={{backgroundColor: "lemonchiffon"}}>
              <div className="left-div">
                {shelf.barcode}
                <div className="left-div">
                  {shelf.deletedBy ?
                    <Undo undoDeletion={() => undoDeletion(shelf.barcode)} isIcon={true} title={t("app.shelfDeleted")}
                          disabled={disabled}/>
                    : disabled ?
                      <Trash2 style={{color: "gray"}}/>
                    : <Alert title={t("app.deleteShelfTitle", {barcode: shelf.barcode})}
                             onSubmit={() => onDeleteShelf(shelf.barcode)} tooltip={t("app.deleteShelf")}/>}
                  <span title={t("app.addNewBox")}>
                    <ListPlus onClick={disabled || shelf.deletedBy ? () => {} : () => onAddBox(shelf.barcode)}
                          style={{color: disabled || shelf.deletedBy ? "gray" : "black"}}/>
                  </span>
                </div>
              </div>
            </CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Box oidc={oidc} boxes={shelf.boxes} storage={storage} shelf={shelf} load={load}/>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
