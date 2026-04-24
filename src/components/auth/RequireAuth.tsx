import { StateEnum } from "@epfl-si/react-appauth";
import { LoginButton } from "@epfl-si/react-appauth";
import { Outlet } from "react-router";

export const RequireAuth = ({ oidc }: { oidc: any }) => {
  if (oidc.state === StateEnum.InProgress) {
    return <div className="flex justify-center items-center h-full p-10">Chargement...</div>;
  }

  if (oidc.state !== StateEnum.LoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Accès restreint</h2>
        <p className="text-gray-600 mb-6">Vous devez être connecté pour voir cette page.</p>
        <LoginButton />
      </div>
    );
  }

  return <Outlet />;
};
