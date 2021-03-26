import React, { useEffect, useState, useContext, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [notificationBody, setNotificationBody] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
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

    async function schedulePushNotification(
      scheduleOptions: Notifications.NotificationRequestInput
    ) {
      await Notifications.scheduleNotificationAsync(scheduleOptions);
    }
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    });

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

  // {
  //     content: {
  //       title: 'First Noftification',
  //       body: notificationBody,
  //       data: { data: 'goes here' }
  //     },
  //     trigger: { seconds: 60, repeats: true }
  //   }
};
