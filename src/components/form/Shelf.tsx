import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import type {ShelfType, StorageType, UserType} from "@/lib/types.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Box} from "@/components/form/Box.tsx";
import {createBox, deleteShelf, undeleteShelf} from "@/lib/graphql/postingTools.ts";
import {ListPlus} from "lucide-react";
import {Alert} from "@/components/parts/Alert.tsx";
import {Undo} from "@/components/parts/Undo.tsx";

export const Shelf = ({ oidc, shelves, setShelves, connectedUser, storage }: {
  oidc: State,
  shelves: ShelfType[],
  setShelves: (shelves: ShelfType[]) => void,
  connectedUser: UserType,
  storage: StorageType
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
          sh.boxes.push({
            barcode: response.barcode,
            createdBy: connectedUser.username,
            createdOn: new Date()
          });
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
      if (connectedUser.isAdmin) {
        setShelves([...getNewShelves(barcode, connectedUser.username, new Date(), true)]);
      } else {
        setShelves([...shelves.filter(sh => sh.barcode !== barcode)]);
      }
    }
  };

  const undoDeletion = async (barcode: string) => {
    const response = await undeleteShelf(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      setShelves([...getNewShelves(barcode, null, null, false)]);
    }
  };

  const getNewShelves = (barcode: string, deletedBy: string, deletedOn: Date, isDeletion: boolean) => {
    return shelves.map(sh => {
      if (sh.barcode === barcode) {
        sh.deletedBy = deletedBy;
        sh.deletedOn = deletedOn;
        if (isDeletion) {
          sh.boxes = sh.boxes.map(box => {
            box.deletedBy = deletedBy;
            box.deletedOn = deletedOn;
            return box;
          })
        }
        return sh;
      } else {
        return sh
      }
    })
  }

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
            <Box oidc={oidc} boxes={shelf.boxes} storage={storage} shelf={shelf} shelves={shelves}
                 setShelves={setShelves} connectedUser={connectedUser} />
          </CardContent>
          <CardFooter className="left-div">
            {shelf.deletedBy ?
              <Undo undoDeletion={() => undoDeletion(shelf.barcode)} isIcon={true} title={t("app.shelfDeleted")}
                    disabled={storage.deletedBy !== null}/>
              : <Alert title={t("app.deleteShelfTitle", {barcode: shelf.barcode})}
                   onSubmit={() => onDeleteShelf(shelf.barcode)} tooltip={t("app.deleteShelf")}/>}
            <span title={t("app.addNewBox")}>
              <ListPlus onClick={() => onAddBox(shelf.barcode)} />
            </span>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
