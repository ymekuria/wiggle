import {
  NavigationContainer,
  NavigationContainerRef,
  getFocusedRouteNameFromRoute,
  RouteProp,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton
} from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import RootNavigator from './RootNavigator';
import { useAuth0 } from '../hooks/useAuth0';
import createApolloClient from '../utils/createApolloClient';
import { navigationRef } from './navigationRef';

type NavigationProps = {
  colorScheme: ColorSchemeName;
};

const Navigation = ({ colorScheme }: NavigationProps) => {
  const { accessToken } = useAuth0();

  const apolloClient = createApolloClient(accessToken);
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer
        ref={navigationRef}
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <RootNavigator accessToken={accessToken} />
      </NavigationContainer>
    </ApolloProvider>
  );
};
export default Navigation;
