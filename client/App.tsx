import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Provider } from 'react-redux';
import { Auth0Provider } from './hooks/useAuth0';
import { AUTH0_CLIENT_ID, AUTH0_AUDIENCE, AUTH0_DOMAIN } from './utils/config';
import store from './store';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default (): JSX.Element | null => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Auth0Provider
        clientId={AUTH0_CLIENT_ID}
        audience={AUTH0_AUDIENCE}
        domain={AUTH0_DOMAIN}
        onLogin={() => {}}
        onTokenRequestFailure={() => {}}
      >
        <React.Fragment>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </React.Fragment>
      </Auth0Provider>
    );
  }
};
