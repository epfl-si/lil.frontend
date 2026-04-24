import {Header} from "@/components/layout/header.tsx";
import {Footer} from "@/components/layout/footer.tsx";
import { Outlet } from "react-router";

export const Layout = ({ user }: { user: any }) => {

  return (
    <main className="flex flex-col h-screen justify-between">
      <Header user={user}/>
      <Outlet />
      <Footer />
    </main>
  );
}
