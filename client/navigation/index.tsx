import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  RouteProp,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
// import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
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

const getHeaderTitle = (route: RouteProp<RootStackParamList, 'Root'>) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen if there hasn't been any navigation inside the screen
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'TabOne';
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
  }
};

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();
// rgba(163,175,243,1) 0%, rgba(220,182,232,1)
const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerStyle: {
            backgroundColor: 'rgba(163,175,243,1)'
          }
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
