import {useEffect, useState} from 'react'
import './App.css'
import {LoginButton, StateEnum, useOpenIDConnectContext} from "@epfl-si/react-appauth";
import {fetchConnectedUser} from "./lib/graphql/fetchingTools.ts";
import {Layout} from "@/components/layout/layout.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {Body} from "@/components/layout/body.tsx";

function App() {
  const oidc = useOpenIDConnectContext();
  const [connectedUser, setConnectedUser] = useState<any>({
    groups: [],
    userName: '',
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

  if (oidc.state == StateEnum.InProgress) {
    return <div></div>;
  }
  if (oidc.state != StateEnum.LoggedIn) {
    return <LoginButton />;
  }
  return (
<>Connected {connectedUser.username}<LoginButton/>
  <BrowserRouter>
    <Routes>
      <Route element={<Layout user={connectedUser} onLogin={() => oidc.login()}
  onLogout={() => oidc.logout()} />}>
        <Route path="/" element={<Body />} />
      </Route>
    </Routes>
  </BrowserRouter></>

  );
}

export default App
