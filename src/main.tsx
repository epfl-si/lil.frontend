import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {LocalStorageBackend, OIDCContext} from "@epfl-si/react-appauth";
import {env} from "./lib/env.ts";

const store = new LocalStorageBackend();
const environment = env();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OIDCContext
      authServerUrl={environment.REACT_APP_AUTH_SERVER_URL ?? ''}
      client={{
        clientId: environment.OIDC_CLIENT_ID ?? '',
        scope: environment.OIDC_SCOPE,
        redirectUri: window.location.href
      }}
      storage={store}
      refreshStorage={window.localStorage}
      onLogout={() => window.location.href=environment.REACT_APP_HOMEPAGE_URL ?? ''}
    >
      <App />
    </OIDCContext>
  </StrictMode>,
)
