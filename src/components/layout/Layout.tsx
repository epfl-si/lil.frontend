import {Header} from "@/components/layout/Header.tsx";
import {Footer} from "@/components/layout/Footer.tsx";
import { Outlet } from "react-router";
import type {UserType} from "@/lib/types.tsx";
import type {State} from "@epfl-si/react-appauth";
import {useTranslation} from "react-i18next";

export const Layout = ({ user, oidc }: { user: UserType, oidc: State }) => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col h-screen justify-between">
      <Header user={user} onLogin={() => oidc.login()}
              onLogout={() => oidc.logout()}/>
      <div className="p-4 sm:p-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t('app.storageFacilityManagement')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('app.manageYourLocation')}</p>
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
