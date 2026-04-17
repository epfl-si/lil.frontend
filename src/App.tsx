import {useEffect} from 'react'
import './App.css'
import {LoginButton, StateEnum, useOpenIDConnectContext} from "@epfl-si/react-appauth";

function App() {
  //const { t } = useTranslation();
  const oidc = useOpenIDConnectContext();
  let loggedIn = false;

  useEffect(() => {
    if (!loggedIn && oidc.state == StateEnum.LoggedIn) {
      loggedIn = true;
    }
  }, [oidc.accessToken, oidc.state]);

  if (oidc.state == StateEnum.InProgress) {
    return <div></div>
  }
  if (oidc.state != StateEnum.LoggedIn) {
    return (
      <LoginButton />
    );
  }
  return (
    <>Connected!</>
  );
}

export default App
