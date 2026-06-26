import {createRoot} from 'react-dom/client'
import '../global.css'
import App from './App.tsx'
import {LocalStorageBackend, OIDCContext} from "@epfl-si/react-appauth";
import '@/components/i18n';
import {env} from "@/lib/env"

const store = new LocalStorageBackend();
createRoot(document.getElementById('root')!).render(
  <OIDCContext
    authServerUrl={env().LIL_REACT_APP_AUTH_SERVER_URL ?? ''}
    client={{
      clientId: env().LIL_OIDC_CLIENT_ID ?? '',
      scope: env().LIL_OIDC_SCOPE,
      redirectUri: env().LIL_REACT_APP_HOMEPAGE_URL
    }}
    storage={store}
    refreshStorage={window.localStorage}
    onLogout={() => window.location.href=env().LIL_REACT_APP_HOMEPAGE_URL ?? ''}
  >
    <App />
  </OIDCContext>
)
