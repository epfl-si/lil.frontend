import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import {Button} from "@/components/ui/button.tsx";
import type {ShelfType} from "@/lib/types.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Box} from "@/components/form/Box.tsx";
import {createBox, deleteShelf} from "@/lib/graphql/postingTools.ts";

export const Shelf = ({ oidc, shelves, setShelves, setIsLoading }: {
  oidc: State,
  shelves: ShelfType[],
  setShelves: (shelves: ShelfType[]) => void,
  setIsLoading: (isLoading: boolean) => void,
}) => {
  const { t } = useTranslation();

  const onAddBox = async (parentBarcode: string) => {
    setIsLoading(true);
    debugger;
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
    setIsLoading(false);
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
          <CardFooter>
            <div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onAddBox(shelf.barcode)}>
                {t("app.addNewBox")}
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onDeleteShelf(shelf.barcode)}>
                {t("app.deleteShelf")}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
