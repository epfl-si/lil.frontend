import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {LocalStorageBackend, OIDCContext} from "@epfl-si/react-appauth";

const store = new LocalStorageBackend();
createRoot(document.getElementById('root')!).render(
  <div>
    <OIDCContext
      authServerUrl={import.meta.env.LIL_REACT_APP_AUTH_SERVER_URL ?? ''}
      client={{
        clientId: import.meta.env.LIL_OIDC_CLIENT_ID ?? '',
        scope: import.meta.env.LIL_OIDC_SCOPE,
        redirectUri: import.meta.env.LIL_REACT_APP_HOMEPAGE_URL
      }}
      storage={store}
      refreshStorage={window.localStorage}
      onLogout={() => window.location.href=import.meta.env.LIL_REACT_APP_HOMEPAGE_URL ?? ''}
    >
      <App />
    </OIDCContext>
  </div>,
)
