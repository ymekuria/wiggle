import { Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  BottomTabBar
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
// import BottomTabBar from '../components/BottomTabBar';
// import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

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
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
// 'rgba(163,175,243,1)', 'rgba(220,182,232,1)';
export default () => {
  const colorScheme = useColorScheme();
  // headerStyle: { backgroundColor: 'rgba(191,241,236,1)'

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        activeBackgroundColor: 'rgba(247,236,250,.3)'
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
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
};

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(163,175,243,1) 0%, rgba(220,182,232,1) 100.2% );

const TabOneStack = createStackNavigator<TabOneParamList>();

const TabOneNavigator = () => {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen name="TabOneScreen" component={TabOneScreen} />
    </TabOneStack.Navigator>
  );
};

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name="TabTwoScreen" component={TabTwoScreen} />
    </TabTwoStack.Navigator>
  );
}
