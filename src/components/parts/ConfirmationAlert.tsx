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

export const ConfirmationAlert = ({ title, description, actionLabel, tooltip, onSubmit}: {
  title: string,
  description: string,
  actionLabel: string
  tooltip: string,
  onSubmit: () => void
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span title={tooltip} className="cursor-pointer">
          <Trash2 style={{color: "black"}}/>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("app.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>{actionLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
