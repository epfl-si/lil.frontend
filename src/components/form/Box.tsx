import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import type {BoxType, ShelfType, StorageType} from "@/lib/types.tsx";
import {deleteBox, restoreBox} from "@/lib/graphql/postingTools.ts";
import {Alert} from "@/components/parts/Alert.tsx";
import {Undo} from "@/components/parts/Undo.tsx";
import {QrCode as BarcodeIcon, Box as BoxIcon, Trash2} from "lucide-react";

export const Box = ({ oidc, storage, shelf, boxes,load }: {
  oidc: State,
  storage: StorageType,
  shelf: ShelfType,
  boxes: BoxType[],
  load: () => void
}) => {
  const { t } = useTranslation();
  const disabled = shelf?.deletedBy !== null || storage?.deletedBy !== null;

  const onDeleteBox = async (barcode: string) => {
    const response = await deleteBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      load();
    }
  };

  const undoDeletion = async (barcode: string) => {
    const response = await restoreBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      load();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {boxes.map((box) => (
        <div key={box.barcode} className="flex items-center gap-2 py-1">
          <BoxIcon color="#007480" />
          <BarcodeIcon size={16} color="#212121" />
          <span className={`text-sm ${box.deletedBy ? 'line-through opacity-50' : ''} flex-1`}>{box.barcode}</span>
          {box.deletedBy ? (
            <Undo
              undoDeletion={() => undoDeletion(box.barcode)}
              isIcon={true}
              title={t("app.boxDeleted")}
              disabled={disabled}
            />
          ) : disabled ? (
            <Trash2 style={{ color: "gray" }} />
          ) : (
            <Alert
              title={t("app.deleteShelfTitle", { barcode: box.barcode })}
              onSubmit={() => onDeleteBox(box.barcode)}
              tooltip={t("app.deleteBox")}
            />
          )}
        </div>
      ))}
    </div>
  );
};
