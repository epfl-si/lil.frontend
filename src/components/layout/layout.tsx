import {Header} from "@/components/layout/header.tsx";
import {Footer} from "@/components/layout/footer.tsx";
import { Outlet } from "react-router";
import type {UserType} from "@/lib/types.tsx";
import type {State} from "@epfl-si/react-appauth";

export const Layout = ({ user, oidc }: { user: UserType, oidc: State }) => {

  return (
    <main className="flex flex-col h-screen justify-between">
      <Header user={user} onLogin={() => oidc.login()}
              onLogout={() => oidc.logout()}/>
      <Outlet />
      <Footer />
    </main>
  );
}
