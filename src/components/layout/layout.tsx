import {Header} from "@/components/layout/header.tsx";
import {Footer} from "@/components/layout/footer.tsx";
import { Outlet } from "react-router";

export const Layout = ({ user, oidc }: { user: any, oidc: any }) => {

  return (
    <main className="flex flex-col h-screen justify-between">
      <Header user={user} onLogin={() => oidc.login()}
  onLogout={() => oidc.logout()}/>
      <Outlet />
      <Footer />
    </main>
  );
}
