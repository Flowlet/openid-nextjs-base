import type { AppProps } from 'next/app';
import { UserProvider, useUser } from './src/utils/openid';

const openidConfig = {
  authority: 'openid.flowlet.app',
  clientId: 'L-1CFl9y17KSC7Qs',
  redirectUri: 'http://localhost:3000/',
  scope: '*'
};

const AppWrapper = ({ Component, pageProps }: AppProps) => {
  const user = useUser();
  if (!user.accessToken) {
    return <div>Logging in...</div>;
  }
  return <Component {...pageProps} />;
};

export default function App(props: AppProps) {
  return (
    <UserProvider {...openidConfig}>
      <AppWrapper {...props} />
    </UserProvider>
  );
}
