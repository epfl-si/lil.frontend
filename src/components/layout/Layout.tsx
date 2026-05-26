import {Header} from "@/components/layout/Header.tsx";
import {Footer} from "@/components/layout/Footer.tsx";
import {Outlet} from "react-router";
import type {UserType} from "@/lib/types.tsx";
import type {State} from "@epfl-si/react-appauth";

export const Layout = ({ user, oidc }: { user: UserType, oidc: State }) => {

  return (
    <main className="flex flex-col h-screen">
      <Header user={user} onLogin={() => oidc.login()}
              onLogout={() => oidc.logout()}/>
      <div className="p-4 sm:p-8 max-w-[80%] mx-auto w-full flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
