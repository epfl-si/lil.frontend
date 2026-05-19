import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import type {BoxType, ShelfType, StorageType, UserType} from "@/lib/types.tsx";
import {deleteBox, undeleteBox} from "@/lib/graphql/postingTools.ts";
import {Alert} from "@/components/parts/Alert.tsx";
import {Undo} from "@/components/parts/Undo.tsx";

export const Box = ({ oidc, storage, shelf, boxes, shelves, setShelves, connectedUser }: {
  oidc: State,
  storage: StorageType,
  shelf: ShelfType,
  boxes: BoxType[],
  shelves: ShelfType[],
  setShelves: (shelves: ShelfType[]) => void,
  connectedUser: UserType}) => {
  const { t } = useTranslation();

  const onDeleteBox = async (barcode: string) => {
    const response = await deleteBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      if (connectedUser.isAdmin) {
        setShelves([...getNewShelves(barcode, connectedUser.username, new Date())]);
      } else {
        setShelves([...shelves.map(sh => {
          if (sh.barcode === shelf.barcode) {
            const index = sh.boxes.findIndex(box => box.barcode === barcode);
            sh.boxes.splice(index, 1);
            return sh;
          } else
            return sh;
        })]);
      }
    }
  };

  const undoDeletion = async (barcode: string) => {
    const response = await undeleteBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      setShelves([...getNewShelves(barcode, null, null)]);
    }
  };

  const getNewShelves = (barcode: string, deletedBy: string, deletedOn: Date) => {
    return shelves.map(sh => {
      if (sh.barcode === shelf.barcode) {
        sh.boxes = sh.boxes.map(box => {
          if (box.barcode === barcode) {
            box.deletedBy = deletedBy;
            box.deletedOn = deletedOn;
            return box;
          } else {
            return box;
          }
        });
        return sh;
      } else
        return sh;
    });
  }

  return (
    <div>
      {boxes.map(box =>
        <div className="left-div">
          {box.barcode}
          {box.deletedBy ?
            <Undo undoDeletion={() => undoDeletion(box.barcode)} isIcon={true} title={t("app.boxDeleted")}
                  disabled={shelf.deletedBy !== null || storage.deletedBy !== null}/>
            : <Alert title={t("app.deleteShelfTitle", {barcode: box.barcode})}
                     onSubmit={() => onDeleteBox(box.barcode)} tooltip={t("app.deleteBox")}/>}
        </div>
      )}
    </div>
  );
};
