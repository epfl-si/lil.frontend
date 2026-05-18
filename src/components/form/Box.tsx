import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {BoxType, ShelfType} from "@/lib/types.tsx";
import {deleteBox} from "@/lib/graphql/postingTools.ts";

export const Box = ({ oidc, shelf, boxes, shelves, setShelves }: { oidc: State, shelf: string, boxes: BoxType[],
  shelves: ShelfType[], setShelves: (shelves: ShelfType[]) => void }) => {
  const { t } = useTranslation();

  const onDeleteBox = async (barcode: string) => {
    const response = await deleteBox(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken,
      {barcode}
    );
    if (response.status === 200 && response.deleted) {
      const newShelves = shelves.map(sh => {
        if (sh.barcode === shelf) {
          const index = sh.boxes.findIndex(box => box.barcode === barcode);
          sh.boxes.splice(index, 1);
          return sh;
        } else
          return sh;
      });
      setShelves([...newShelves]);
    }
  };

  return (
    <div>
      {boxes.map(box =>
        <Card size="sm" className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>{box.barcode}</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={() => onDeleteBox(box.barcode)}>
              {t("app.deleteBox")}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
