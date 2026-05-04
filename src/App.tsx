import {useEffect, useState} from 'react'
import './App.css'
import {StateEnum, useOpenIDConnectContext} from "@epfl-si/react-appauth";
import {fetchConnectedUser} from "./lib/graphql/fetchingTools.ts";
import {Layout} from "@/components/layout/Layout.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {Body} from "@/components/layout/Body.tsx";
import { RequireAuth } from "@/components/auth/RequireAuth.tsx";
import { BarcodeDetailPage } from "@/components/pages/BarcodeDetailPage.tsx";
import type {UserType} from "@/lib/types.tsx";

function App() {
  const oidc = useOpenIDConnectContext();
  const [connectedUser, setConnectedUser] = useState<UserType>({
    groups: [],
    username: '',
    isAdmin: false
  });

  useEffect(() => {
    if (oidc.state == StateEnum.LoggedIn) {
      loadFetch();
    }
  }, [oidc.accessToken, oidc.state]);

  const loadFetch = async () => {
    const results = await fetchConnectedUser(
      import.meta.env.LIL_REACT_APP_GRAPHQL_ENDPOINT_URL,
      oidc.accessToken
    );
    if (results.status === 200 && results.data) {
      console.log('ConnectedUser', results.data);
      setConnectedUser(results.data);
    } else {
      console.log('ConnectedUser Error', results);
      oidc.logout();
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout user={connectedUser} oidc={oidc} />}>
            <Route element={<RequireAuth oidc={oidc} />}>
              <Route path="/" element={<Body oidc={oidc} />} />
              <Route path="/code/:barcode" element={<BarcodeDetailPage oidc={oidc} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
