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

import { useAuth0 } from '../hooks/useAuth0';
import createApolloClient from '../utils/createApolloClient';
import { navigationRef } from './navigationRef';
import { null } from 'mathjs';

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
  // navigationRef: React.RefObject<NavigationContainerRef>;
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
  // let { accessToken } = useAuth0();
  // const { setAccessToken } = useAuth0();

  // React.useEffect(() => {
  //   // SecureStore.setItemAsync('accessToken', '');
  //   if (!accessToken) {
  //     SecureStore.getItemAsync('accessToken').then((token) => {
  //       accessToken = token;
  //       console.log('accessToken in Navigation from asyncStorage', accessToken);
  //       setAccessToken(accessToken);
  //     });
  //   }
  // }, [accessToken]);

   const{ accessToken } = useAuth0();
   console.log('accessToken in RootNav', accessToken) 
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
      {accessToken ? (
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
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: 'SignIn!' }}
        />
      )}

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
};
// export const navigationRef = React.createRef<NavigationContainerRef>();
const Navigation = ({ colorScheme }: NavigationProps) => {
  const { accessToken } = useAuth0();
  console.log('accessToken in Navigation', accessToken);
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
