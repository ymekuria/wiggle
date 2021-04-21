import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  FlatList,
  Platform,
  Pressable,
  TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';

import { TabOneParamList } from '../navigation/BottomTabNavigator';
import usePushNotifications from '../hooks/usePushNotifications';
import { Text, View } from '../components/Themed';
import { useThemeColor } from '../components/Themed';

type ScheduleWiggleScreenProps = {
  navigation: StackNavigationProp<TabOneParamList>;
};

enum PickerItemValue {
  JokeDisplayScreen = 'JokeDisplayScreen',
  DogPicsDisplayScreen = 'DogPicsDisplayScreen'
}
const ScheduleWiggleScreen: React.FC<ScheduleWiggleScreenProps> = ({
  navigation
}) => {
  const [notificationBody, setNotificationBody] = useState('');

  const [
    schedulePushNotification,
    cancelAllNotificationsAsync
  ] = usePushNotifications();
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          onChangeText={setNotificationBody}
          value={notificationBody}
          placeholder="Notification Body"
        />
      </View>
      <Pressable
        onPress={async () => {
          console.log('pressed');
          await schedulePushNotification({
            content: {
              title: 'First Noftification',
              body: notificationBody,
              data: { data: 'goes here' }
            },
            trigger: { seconds: 60, repeats: true }
          });
        }}
      >
        <Text>Press to schedule a notification"</Text>
      </Pressable>
      <Pressable
        onPress={async () => {
          const result = cancelAllNotificationsAsync();
          console.log('isCanceled', result);
        }}
      >
        <Text>Cancel all scheduled notifications</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ScheduleWiggleScreen;
