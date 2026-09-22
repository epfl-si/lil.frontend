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
import {Button} from "@/components/ui/button.tsx";

export const ConfirmationAlert = ({ title, description, actionLabel, tooltip, onSubmit, isPrimaryButton, disable}: {
  title: string,
  description: string,
  actionLabel: string
  tooltip: string,
  onSubmit: () => void,
  isPrimaryButton?: boolean,
  disable?: boolean
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isPrimaryButton ?
          <Button className="primary-buttons"
                  variant="outline"
                  disabled={disable}
                  size="lg">
            <Trash2 />
            {tooltip}
          </Button> :
          <span title={tooltip} className="cursor-pointer">
            <Trash2 style={{color: "black"}}/>
          </span>
        }
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
