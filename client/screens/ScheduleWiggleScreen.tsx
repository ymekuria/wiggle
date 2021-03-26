import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  FlatList,
  Platform,
  Button,
  TextInput
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';

import { TabOneParamList } from '../navigation/BottomTabNavigator';
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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [notificationBody, setNotificationBody] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('addNotificationResponseREcievedListner', response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'First Noftification',
        body: notificationBody,
        data: { data: 'goes here' }
      },
      trigger: { seconds: 60, repeats: true }
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      });
    }

    return token;
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    })
  });
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
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <Button
        title="Cancel all scheduled notifications"
        onPress={async () => {
          const result = Notifications.cancelAllScheduledNotificationsAsync();
          console.log('isCanceled', result);
        }}
      />
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
