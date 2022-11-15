import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type User = {
  accessToken: string;
  profile: {
    sub: string;
    mail: string;
    exp: number;
    [k: string]: any;
  };
  logout: () => void;
};

const emptyUser = {
  accessToken: '',
  profile: { sub: '', mail: '', exp: 0 },
  logout: () => {}
};

const userContext = createContext<User>(emptyUser);

export const useUser = () => {
  return {
    ...useContext(userContext)
  };
};

export const UserProvider = ({
  children,
  authority,
  scope,
  clientId,
  redirectUri
}: {
  children: ReactNode;
  authority: string;
  scope: string;
  clientId: string;
  redirectUri: string;
}) => {
  const [user, setUser] = useState<User>(emptyUser);

  /**
   * Read the OpenID discovery endpoint.
   */
  const readConfig = async () => {
    const configRequest = await fetch(`https://${authority}/.well-known/openid-configuration`);
    if (configRequest.status !== 200) {
      console.error('Unable to fetch openid configuration.');
      return;
    }
    return configRequest.json();
  };

  /**
   * Start the OAuth2 authorization flow.
   */
  const redirectToLogin = async () => {
    try {
      const config = await readConfig();
      if (config) {
        const params = new URLSearchParams({
          response_type: 'id_token',
          scope,
          client_id: clientId,
          redirect_uri: redirectUri
        });
        const url = config.authorization_endpoint + '?' + params.toString();
        document.location = url;
      }
    } catch (err) {}
  };

  /**
   * Process authentication on load.
   */
  useEffect(() => {
    if ((window as any).loggedin) {
      return;
    }

    const hashParams = new URLSearchParams(document.location.hash.substring(1));
    if (hashParams.has('id_token')) {
      (window as any).loggedin = true;
      const token = hashParams.get('id_token');
      const expires = hashParams.get('expires_in');
      if (expires) {
        // Redirect to login when token expires.
        setTimeout(redirectToLogin, parseInt(expires, 10) * 1000);
      }
      // Remove access token from url.
      history.replaceState('', document.title, window.location.pathname + window.location.search);

      (async () => {
        const config = await readConfig();
        if (config && token) {
          const profileRequest = await fetch(config.userinfo_endpoint, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (profileRequest.status !== 200) {
            console.error('Error reading user profile');
            return;
          }
          const profile = await profileRequest.json();
          setUser({
            accessToken: token,
            profile,
            logout: () => {
              document.location = config.end_session_endpoint + '?id_token_hint=' + token;
            }
          });
        }
      })();
    } else {
      // No authentication found. Need to obtain a new token.
      redirectToLogin();
    }
  }, []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};
