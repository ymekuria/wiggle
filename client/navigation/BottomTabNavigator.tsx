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
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      tabBar={(props) => {
        return (
          // <LinearGradient
          //   colors={['rgba(191,241,236,1)', 'rgba(109,192,236,1)']}
          //   // start={[1, 0]}
          //   // end={[0, 0]}
          // >
          <BottomTabBar
            {...props}
            style={{ backgroundColor: 'rgba(109,192,236,1)' }}
          />
          // </LinearGradient>
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
    </BottomTab.Navigator>
  );
};

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: 'Tab One Title'
          // headerStyle: { backgroundColor: 'rgba(191,241,236,1)' }
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: 'Tab Two Title',
          headerStyle: { backgroundColor: 'rgba(191,241,236,1)' }
        }}
      />
    </TabTwoStack.Navigator>
  );
}
