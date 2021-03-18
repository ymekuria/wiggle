import { Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  BottomTabBar
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import * as React from 'react';

import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabFourScreen from '../screens/TabFourScreen';
import ContactDisplayScreen from '../screens/ContactDisplayScreen';
import DogPicDisplayScreen from '../screens/DogPicScreen';
import DogPicsDisplay from '../components/DogPicsDisplay';
import CreateWiggleScreen from '../screens/CreateWiggleScreen';

import { useThemeColor } from '../components/Themed';

type TabOneParamList = {
  DogPicsDisplay: undefined;
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
// background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(163,175,243,1) 0%, rgba(220,182,232,1) 100.2% );

const TabOneStack = createStackNavigator<TabOneParamList>();

const TabOneNavigator = () => {
  const headerTintColor = useThemeColor(
    { light: undefined, dark: undefined },
    'tint'
  );
  return (
    <TabOneStack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: 'rgba(163,175,243,1)'
        },

        headerTintColor: headerTintColor
      })}
    >
      <TabOneStack.Screen
        name="CreateWiggleScreen"
        component={CreateWiggleScreen}
      />
      <TabOneStack.Screen name="DogPicsDisplay" component={DogPicsDisplay} />
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
      initialRouteName="TabTwoScreen"
      headerMode="screen"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: 'rgba(163,175,243,1)'
        },

        headerTintColor: headerTintColor
      })}
    >
      <TabTwoStack.Screen name="TabTwoScreen" component={TabTwoScreen} />
      <TabTwoStack.Screen
        name="ContactDisplayScreen"
        component={ContactDisplayScreen}
        // options={() => ({
        //   headerStyle: {
        //     backgroundColor: 'rgba(163,175,243,1)'
        //   }
        // })}
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
      <TabThreeStack.Screen name="TabThreeScreen" component={TabThreeScreen} />
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
        // activeTintColor: Colors['dark'].tint,
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
