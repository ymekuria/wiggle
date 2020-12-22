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

import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
// import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { useAuth0 } from '../hooks/useAuth0';
import createApolloClient from '../utils/createApolloClient';

type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  SignIn: undefined;
};

type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

type TabOneParamList = {
  TabOneScreen: undefined;
};

type TabTwoParamList = {
  TabTwoScreen: undefined;
};

type NavigationProps = {
  navigationRef: React.RefObject<NavigationContainerRef>;
  colorScheme: ColorSchemeName;
};

const getHeaderTitle = (route: RouteProp<RootStackParamList, 'Root'>) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen if there hasn't been any navigation inside the screen
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'SignIn';
  console.log('routName', routeName);
  // add routeName and title here for each new tab screen
  switch (routeName) {
    case 'TabOne':
      return 'Tab One';
    case 'TabTwo':
      return 'Tab Two';
    case 'TabThree':
      return 'Tab Three';
    case 'TabFour':
      return 'Tab Four';
    case 'SignIn':
      return 'SignIn';
  }
};

const Stack = createStackNavigator<RootStackParamList>();
// rgba(163,175,243,1) 0%, rgba(220,182,232,1)
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      headerMode="none"
      screenOptions={({ route }) => ({
        headerTitle: getHeaderTitle(route),

        headerStyle: {
          backgroundColor: 'rgba(163,175,243,1)'
        }
      })}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        // options={({ route }) => ({
        //   headerTitle: getHeaderTitle(route),

        //   headerStyle: {
        //     backgroundColor: 'rgba(163,175,243,1)'
        //   }
        // })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'SignIn!' }}
      />
    </Stack.Navigator>
  );
};

const Navigation = ({ colorScheme, navigationRef }: NavigationProps) => {
  const { accessToken } = useAuth0();
  console.log('access token:', accessToken);
  const apolloClient = createApolloClient(accessToken);
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer
        ref={navigationRef}
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};
export default Navigation;
