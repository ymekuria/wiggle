import { Platform } from 'react-native';
import React, { useEffect, useState, useContext, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { navigationRef } from '../navigation/navigationRef';

export default () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState(false);
  const [notificationBody, setNotificationBody] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  async function schedulePushNotification(
    scheduleOptions: Notifications.NotificationRequestInput
  ) {
    await Notifications.scheduleNotificationAsync(scheduleOptions);
  }

  async function cancelAllNotificationsAsync() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  async function cancelNotificationAsync(identifier: string) {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }
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
      } else {
        // interactive buttons for push notifiaction
        Notifications.setNotificationCategoryAsync('basic', [
          { identifier: 'dog', buttonTitle: 'Send Dog Wiggle 😀' },
          { identifier: 'joke', buttonTitle: 'Send Joke Wiggle 😕' }
        ]);
      }
      // Check category is there
      Notifications.getNotificationCategoriesAsync().then((categories) => {
        console.log('categories', categories);
      });

      // Get experienceId
      const experienceId = Constants.manifest.id;
      console.log('experienceId', experienceId);

      return token;
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    });

    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    async function handleNotificationResponse(response) {
      const actionType = response.actionIdentifier;
      switch (actionType) {
        case 'dog':
          console.log('case yes');
          navigationRef.current?.navigate('TabOne', {
            screen: 'DogPicsDisplayScreen'
          });
        case 'joke':
          console.log('case yes');
          navigationRef.current?.navigate('TabOne', {
            screen: 'JokeDisplayScreen'
          });
        default:
          break;
      }
    }

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => console.log(response)
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

  return [
    schedulePushNotification,
    cancelAllNotificationsAsync,
    cancelNotificationAsync
  ] as const;
};
