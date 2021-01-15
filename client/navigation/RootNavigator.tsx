import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigatorScreenParams
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Route } from '@react-navigation/routers';
import BottomTabNavigator, {
  BottomTabNavaigatorParamList
} from './BottomTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabNavaigatorParamList>;
  NotFound: undefined;
  SignIn: undefined;
};

type RootNavigatorProps = {
  accessToken: string | undefined;
};

const getHeaderTitle = (route: Route<string>) => {
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
const RootNavigator: React.FC<RootNavigatorProps> = ({ accessToken }) => {
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

export default RootNavigator;
