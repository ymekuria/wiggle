import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { Auth0Provider } from './hooks/useAuth0';
import { Provider as ContactProvider } from './context/ContactContext';
import { Provider as WiggleProvider } from './context/WiggleContext';
import { AUTH0_CLIENT_ID, AUTH0_AUDIENCE, AUTH0_DOMAIN } from './utils/config';
import store from './store';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { navigationRef } from './navigation/navigationRef';
// export const navigationRef = React.createRef<NavigationContainerRef>();

const App = (): JSX.Element | null => {
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
        onLogin={() => {
          // navigationRef.current?.navigate('Root', { screen: 'TabThree' });
        }}
        onTokenRequestFailure={() => {
          // navigationRef.current?.navigate('SignIn');
        }}
      >
        <ContactProvider>
          <WiggleProvider>
            <React.Fragment>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </React.Fragment>
          </WiggleProvider>
        </ContactProvider>
      </Auth0Provider>
    );
  }
};

export default App;
