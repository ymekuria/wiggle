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
  const pickerItemTextColor = useThemeColor(
    { light: undefined, dark: undefined },
    'text'
  );

  const [
    schedulePushNotification,
    cancelAllNotificationsAsync
  ] = usePushNotifications();

  const [frequencySelection, setFrequencySelection] = useState('');
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
        selectedValue={frequencySelection}
        onValueChange={(frequencyItem) => {
          setFrequencySelection(frequencyItem);
          console.log('item', frequencyItem);
          if (frequencyItem !== '') {
            // navigation.navigate(frequencySelection as PickerItemValue);
          }
        }}
      >
        {/* <Picker.Item label="Create a Wiggle" value="" /> */}
        <Picker.Item label="Daily" value="Daily" />
        <Picker.Item label="Twice a Day" value="Twice" />
        <Picker.Item label="Weekly" value="Weekly" />
      </Picker>

      <Picker
        style={styles.picker}
        itemStyle={{
          color: pickerItemTextColor,
          height: 100
        }}
        mode={'dialog'}
        selectedValue={frequencySelection}
        onValueChange={(frequencyItem) => {
          setFrequencySelection(frequencyItem);
          console.log('item', frequencyItem);
          if (frequencyItem !== '') {
            // navigation.navigate(frequencySelection as PickerItemValue);
          }
        }}
      >
        {/* <Picker.Item label="Create a Wiggle" value="" /> */}
        <Picker.Item label="Dog Wiggle" value="Daily" />
        <Picker.Item label="Joke Wiggle" value="Twice" />
      </Picker>

      {/* <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(247,236,250,.3)'
        }}
      >
        <TextInput
          style={{ fontSize: 20 }}
          onChangeText={setNotificationBody}
          value={notificationBody}
          placeholder="Notification Body"
        />
      </View> */}
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
  },
  picker: {
    width: 300,
    height: 100,
    backgroundColor: 'transparent'
  }
});

export default ScheduleWiggleScreen;
