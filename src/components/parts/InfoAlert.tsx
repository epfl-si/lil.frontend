import {AlertCircleIcon, X} from "lucide-react";
import {
  Alert, AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import type {NotificationType} from "@/lib/types.tsx";

export const InfoAlert = ({ notification, close }: {
  notification: NotificationType,
  close: () => void
}) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-none ${notification.visible}`}>
      <Alert variant={notification.variant} className={`max-w-md w-full pointer-events-auto shadow-lg`} >
        <AlertCircleIcon />
        <div className="flex-1">
          <AlertTitle>{notification.title}</AlertTitle>
          <AlertDescription>
            {notification.body}
          </AlertDescription>
        </div>
        <AlertAction>
          <X onClick={close}
             className="cursor-pointer" />
        </AlertAction>
      </Alert>
    </div>
  );
};
