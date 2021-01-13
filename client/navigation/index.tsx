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
// import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import RootNavigator from './RootNavigator';
import { useAuth0 } from '../hooks/useAuth0';
import createApolloClient from '../utils/createApolloClient';
import { navigationRef } from './navigationRef';

// type RootStackParamList = {
//   Root: undefined;
//   NotFound: undefined;
//   SignIn: undefined;
// };

// type BottomTabParamList = {
//   TabOne: undefined;
//   TabTwo: undefined;
// };

// type TabOneParamList = {
//   TabOneScreen: undefined;
// };

// type TabTwoParamList = {
//   TabTwoScreen: undefined;
// };

type NavigationProps = {
  // navigationRef: React.RefObject<NavigationContainerRef>;
  colorScheme: ColorSchemeName;
};

// n   // export const navigationRef = React.createRef<NavigationContainerRef>();
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
