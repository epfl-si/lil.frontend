import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import type {NotificationType, ShelfType, StorageType, UserType} from "@/lib/types.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Box} from "@/components/form/Box.tsx";
import {Button} from "@/components/ui/button.tsx";
import {createBox, createShelf, deleteShelf, restoreShelf} from "@/lib/graphql/postingTools.ts";
import {Plus as AddIcon, QrCode as BarcodeIcon, Rows2 as ShelfIcon, Trash2} from "lucide-react";
import {Alert} from "@/components/parts/Alert.tsx";
import {Undo} from "@/components/parts/Undo.tsx";
import {handleResponse} from "@/lib/graphql/utils.ts";

export const Shelf = ({ oidc, shelves, storage, load, setNotification, connectedUser, allowsBoxes, allowsShelves }: {
  oidc: State,
  shelves: ShelfType[],
  storage: StorageType,
  load: () => void,
  setNotification: (notification: NotificationType) => void,
  connectedUser: UserType,
  allowsBoxes: boolean,
  allowsShelves: boolean
}) => {
  const { t } = useTranslation();
  const disabled = storage?.deletedBy !== null;

  const onAddBox = async (parentBarcode: string) => {
    const response = await createBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {parentBarcode}
    );
    await handleResponse(response, setNotification, load);
  };

  const onAddShelf = async () => {
    const response = await createShelf(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {parentBarcode: storage.barcode}
    );
    await handleResponse(response, setNotification, load);
  };

  const onDeleteShelf = async (barcode: string) => {
    const response = await deleteShelf(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    await handleResponse(response, setNotification, load);
  };

  const undoDeletion = async (barcode: string) => {
    const response = await restoreShelf(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    await handleResponse(response, setNotification, load);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {shelves.map(shelf =>
        <Card size="sm" className="w-full rounded-[12px]" key={shelf.barcode}>
          <CardHeader className={`bg-[#f0f0f0] border-b-2 rounded-t-[12px] ${shelf.deletedBy ? 'bg-red-100' : 'bg-[#f0f0f0]'}`}>
            <CardTitle>
              <div className="flex items-center gap-2 py-1">
                <ShelfIcon color="#ee6b00" />
                <BarcodeIcon size={16} color="#212121" />
                <span className={`font-bold ${shelf.deletedBy ? 'line-through opacity-50' : ''} flex-1`}>{shelf.barcode}</span>
                {!connectedUser.isReadOnly &&
                  <div>
                    {shelf.deletedBy ?
                      <Undo
                        undoDeletion={() => undoDeletion(shelf.barcode)}
                        isIcon={true}
                        title={t("app.shelfDeleted")}
                        disabled={disabled}/>
                    : disabled ?
                      <Trash2 className="text-gray-400" />
                      : <Alert
                          title={t("app.deleteShelfTitle")}
                          description={t("app.deleteShelfDescription", { barcode: shelf.barcode })}
                          actionLabel={t("app.delete")}
                          onSubmit={() => onDeleteShelf(shelf.barcode)}
                          tooltip={t("app.deleteShelf")}/>
                    }
                </div>
                }
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className={shelf.deletedBy ? 'opacity-50' : ''}>
            <Box oidc={oidc} boxes={shelf.boxes} storage={storage} shelf={shelf} load={load} connectedUser={connectedUser} setNotification={setNotification} />
            {!connectedUser.isReadOnly && (allowsBoxes ? <Button className={`w-full mb-4 ${shelf.boxes.length > 0 ? 'mt-4' : ''}`}
                     variant="outline"
                     size="lg"
                     disabled={disabled || !!shelf.deletedBy}
                     onClick={() => onAddBox(shelf.barcode)}
            >
              <AddIcon/>
              {t('app.addNewBox')}
            </Button> : <p className="text-red-500 text-sm font-medium mb-3">{t("app.boxesNoteAllowed")}</p>)}
          </CardContent>
        </Card>
      )}
      {!connectedUser.isReadOnly && (allowsShelves ? <Button className="cursor-pointer"
               variant="outline"
               size="lg"
               disabled={disabled}
               onClick={onAddShelf}
      >
        <AddIcon/>
        {t('app.addNewShelf')}
      </Button> : <p className="text-red-500 text-sm font-medium">{t("app.shelvesNoteAllowed")}</p>)
      }
    </div>
  );
};
