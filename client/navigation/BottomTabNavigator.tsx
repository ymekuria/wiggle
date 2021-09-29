import { Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  BottomTabBar
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import * as React from 'react';
import { Text, View } from 'react-native';

import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import JokeDisplayScreen from '../screens/JokeDisplayScreen';
import TabFourScreen from '../screens/TabFourScreen';
import ContactDisplayScreen from '../screens/ContactDisplayScreen';
import ContactsDisplayScreen from '../screens/ContactsDisplayScreen';
import DogPicsDisplayScreen from '../screens/DogPicsDisplayScreen';

import CreateWiggleScreen from '../screens/CreateWiggleScreen';
import ScheduleWiggleScreen from '../screens/ScheduleWiggleScreen';

import { useThemeColor } from '../components/Themed';

export type TabOneParamList = {
  CreateWiggleScreen: undefined;
  ScheduleWiggleScreen: undefined;
  DogPicsDisplayScreen: undefined;
  JokeDisplayScreen: undefined;
};

type TabTwoParamList = {
  TabTwoScreen: undefined;
  ContactDisplayScreen: undefined;
};

type TabThreeParamList = {
  TabThreeScreen: undefined;
};
type TabFourParamList = {
  TabFourScreen: undefined;
};

export type BottomTabNavaigatorParamList = {
  TabOne: NavigatorScreenParams<TabOneParamList>;
  TabTwo: NavigatorScreenParams<TabTwoParamList>;
  TabThree: NavigatorScreenParams<TabThreeParamList>;
  TabFour: NavigatorScreenParams<TabFourParamList>;
};

const TabOneStack = createStackNavigator<TabOneParamList>();

const TabOneNavigator = () => {
  const headerTintColor = useThemeColor(
    { light: undefined, dark: undefined },
    'tint'
  );
  return (
    <TabOneStack.Navigator
      headerMode={'screen'}
      screenOptions={() => ({
        headerTransparent: true,
        headerTitle: '',

        headerTintColor: headerTintColor
      })}
    >
      <TabOneStack.Screen name=" " component={CreateWiggleScreen} />
      <TabOneStack.Screen
        name="ScheduleWiggleScreen"
        component={ScheduleWiggleScreen}
      />
      <TabOneStack.Screen
        name="DogPicsDisplayScreen"
        component={DogPicsDisplayScreen}
      />
      <TabOneStack.Screen
        name="JokeDisplayScreen"
        component={JokeDisplayScreen}
      />
    </TabOneStack.Navigator>
  );
};

const TabTwoStack = createStackNavigator<TabTwoParamList>();

const TabTwoNavigator = () => {
  const headerTintColor = useThemeColor(
    { light: undefined, dark: undefined },
    'tint'
  );
  console.log('themeColor', headerTintColor);
  return (
    <TabTwoStack.Navigator
      initialRouteName="ContactsDisplayScreen"
      headerMode="screen"
      screenOptions={() => ({
        headerTransparent: true,
        headerTitle: '',

        headerTintColor: headerTintColor
      })}
    >
      <TabTwoStack.Screen
        name="ContactsDisplayScreen"
        component={ContactsDisplayScreen}
      />
      <TabTwoStack.Screen
        name="ContactDisplayScreen"
        component={ContactDisplayScreen}
      />
    </TabTwoStack.Navigator>
  );
};

const TabThreeStack = createStackNavigator<TabThreeParamList>();

const TabThreeNavigator = () => {
  const headerTintColor = useThemeColor(
    { light: undefined, dark: undefined },
    'tint'
  );
  return (
    <TabThreeStack.Navigator
      headerMode="screen"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: 'rgba(163,175,243,1)'
        },

        headerTintColor: headerTintColor
      })}
    >
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={JokeDisplayScreen}
      />
    </TabThreeStack.Navigator>
  );
};

const TabFourStack = createStackNavigator<TabFourParamList>();

const TabFourNavigator = () => {
  const headerTintColor = useThemeColor(
    { light: undefined, dark: undefined },
    'tint'
  );
  return (
    <TabFourStack.Navigator
      headerMode="screen"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: 'rgba(163,175,243,1)'
        },

        headerTintColor: headerTintColor
      })}
    >
      <TabFourStack.Screen name="TabFourScreen" component={TabFourScreen} />
    </TabFourStack.Navigator>
  );
};

const TabBarIcon = (props: { name: string; color: string }): JSX.Element => {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
};

const BottomTab = createBottomTabNavigator<BottomTabNavaigatorParamList>();
// 'rgba(163,175,243,1)', 'rgba(220,182,232,1)';
const BottomTabNavigator: React.FC = () => {
  const bottomNavTintColor = useThemeColor(
    { light: undefined, dark: undefined },
    'tint'
  );

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: bottomNavTintColor,
        activeBackgroundColor: 'rgba(247,236,250,.3)',
        showLabel: false
      }}
      tabBar={(props) => {
        return (
          <BottomTabBar
            {...props}
            style={{
              backgroundColor: 'rgba(220,182,232,1)'
            }}
          />
        );
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-add" color={color} />
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-calendar" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-share" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="ios-settings" color={color} />;
          }
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
