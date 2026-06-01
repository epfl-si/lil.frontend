import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import type {BoxType, NotificationType, ShelfType, StorageType, UserType} from "@/lib/types.tsx";
import {deleteBox, restoreBox} from "@/lib/graphql/postingTools.ts";
import {ConfirmationAlert} from "@/components/parts/ConfirmationAlert.tsx";
import {Undo} from "@/components/parts/Undo.tsx";
import {QrCode as BarcodeIcon, Archive as BoxIcon, Trash2} from "lucide-react";
import {handleResponse} from "@/lib/graphql/utils.ts";

export const Box = ({ oidc, storage, shelf, boxes, load, setNotification, connectedUser }: {
  oidc: State,
  storage: StorageType,
  shelf: ShelfType,
  boxes: BoxType[],
  load: () => void,
  setNotification: (notification: NotificationType) => void,
  connectedUser: UserType
}) => {
  const { t } = useTranslation();
  const disabled = shelf?.deletedBy !== null || storage?.deletedBy !== null;

  const onDeleteBox = async (barcode: string) => {
    const response = await deleteBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    await handleResponse(response, setNotification, load);
  };

  const undoDeletion = async (barcode: string) => {
    const response = await restoreBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    await handleResponse(response, setNotification, load);
  };

  return (
    <div className="flex flex-col gap-1">
      {boxes.map((box) => (
        <div key={box.barcode} className={`flex items-center gap-2 py-1 ${box.deletedBy ? 'bg-red-100 -mx-4 px-4' : ''}`}>
          <BoxIcon color="#007480" />
          <BarcodeIcon size={16} color="#212121" />
          <span className={`text-sm ${box.deletedBy ? 'line-through opacity-50' : ''} flex-1`}>{box.barcode}</span>
          {!connectedUser.isReadOnly ? (box.deletedBy ? (
            <Undo
              undoDeletion={() => undoDeletion(box.barcode)}
              isIcon={true}
              title={t("app.boxDeleted")}
              disabled={disabled}
            />
          ) : disabled ? (
            <Trash2 className="text-gray-400" />
          ) : (
            <ConfirmationAlert
              title={t("app.deleteBoxTitle")}
              description={t("app.deleteBoxDescription", { barcode: box.barcode })}
              actionLabel={t("app.delete")}
              onSubmit={() => onDeleteBox(box.barcode)}
              tooltip={t("app.deleteBox")}
            />
          )) : ''}
        </div>
      ))}
    </div>
  );
};
