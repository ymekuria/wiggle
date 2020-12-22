import { Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  BottomTabBar
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  HeaderBackButton
} from '@react-navigation/stack';

import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabFourScreen from '../screens/TabFourScreen';
import ContactDisplayScreen from '../screens/ContactDisplayScreen';
import SignInScreen from '../screens/SignInScreen';
import { useThemeColor } from '../components/Themed';

type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  TabFour: undefined;
};

type TabOneParamList = {
  TabOneScreen: undefined;
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
      <TabOneStack.Screen name="TabOneScreen" component={TabOneScreen} />
    </TabOneStack.Navigator>
  );
};

const TabTwoStack = createStackNavigator<TabTwoParamList>();

const TabTwoNavigator = () => {
  const headerTintColor = useThemeColor(
    { light: undefined, dark: undefined },
    'tint'
  );

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
// options={{
//   headerLeft: (props) => (
//     <HeaderBackButton
//       onPress={() => {
//         console.log('props on back button', props);
//         // alert('This is a button!');
//       }}
//       label="Back"
//     />
//   )
// }}
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
      <TabFourStack.Screen name="TabFourScreen" component={SignInScreen} />
    </TabFourStack.Navigator>
  );
};

const TabBarIcon = (props: { name: string; color: string }): JSX.Element => {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
// 'rgba(163,175,243,1)', 'rgba(220,182,232,1)';
const BottomTabNavigator: React.FC = () => {
  const bottomNavTintColor = useThemeColor(
    { light: undefined, dark: undefined },
    'tint'
  );

  return (
    <BottomTab.Navigator
      initialRouteName="TabTwo"
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
