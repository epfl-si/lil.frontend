import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "../ui/alert-dialog";
import {useTranslation} from "react-i18next";
import {Trash2} from "lucide-react";

export const Alert = ({ title, body, tooltip, onSubmit}: {
  title: string,
  body?: string,
  tooltip: string,
  onSubmit: () => void
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span title={tooltip}>
          <Trash2 />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {body && <AlertDialogDescription>
            {body}
          </AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("app.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>{t("app.continue")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
