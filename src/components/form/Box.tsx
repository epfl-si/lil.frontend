import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from 'react-i18next';
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {BoxType} from "@/lib/types.tsx";

export const Box = ({ oidc, boxes }: { oidc: State, boxes: BoxType[] }) => {
  const { t } = useTranslation();

  return (
    <div>
      {boxes.map(box =>
        <Card size="sm" className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>{box.barcode}</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              {t("app.deleteBox")}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
