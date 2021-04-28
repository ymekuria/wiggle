import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, FlatList, Platform, TextInput } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

import { TabOneParamList } from '../navigation/BottomTabNavigator';
import usePushNotifications from '../hooks/usePushNotifications';
import Button from '../components/Button';
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
      <Picker
        style={styles.picker}
        itemStyle={{
          color: pickerItemTextColor,
          height: 100
        }}
        mode={'dialog'}
        selectedValue={wiggleSelection}
        onValueChange={(wiggleItem) => {
          setWiggleSelection(wiggleItem);
          console.log('item', wiggleItem);
          if (wiggleItem !== '') {
            // navigation.navigate(wiggleSelection as PickerItemValue);
          }
        }}
      >
        {/* <Picker.Item label="Create a Wiggle" value="" /> */}
        <Picker.Item label="Send a Dog Wiggle" value="DogPicsDisplayScreen" />
        <Picker.Item label="Send a Joke Wiggle" value="JokeDisplayScreen" />
        <Picker.Item label="Schedule a Wiggle" value="ScheduleWiggleScreen" />
      </Picker>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(247,236,250,.3)'
        }}
      >
        <TextInput
          style={{ fontSize: 50 }}
          onChangeText={setNotificationBody}
          value={notificationBody}
          placeholder="Notification Body"
        />
      </View>
      <Button
        style={styles.buttonStyle}
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
        <Text>Press to schedule a notification</Text>
      </Button>
      <Button
        style={styles.buttonStyle}
        onPress={async () => {
          const result = cancelAllNotificationsAsync();
          console.log('isCanceled', result);
        }}
      >
        <Text>Cancel all scheduled notifications</Text>
      </Button>
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
  },
  buttonStyle: {
    margin: 20
  }
});

export default ScheduleWiggleScreen;
