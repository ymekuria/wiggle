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

  const [frequencySelection, setFrequencySelection] = useState('daily');
  const [wiggleTypeSelection, setWiggleTypeSelection] = useState('dog');
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
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Twice a Day" value="twice" />
        <Picker.Item label="Weekly" value="weekly" />
      </Picker>

      <Picker
        style={styles.picker}
        itemStyle={{
          color: pickerItemTextColor,
          height: 100
        }}
        mode={'dialog'}
        selectedValue={wiggleTypeSelection}
        onValueChange={(wiggleItem) => {
          setWiggleTypeSelection(wiggleItem);
          console.log('WiggleItem', wiggleItem);
          if (wiggleItem !== '') {
            // navigation.navigate(frequencySelection as PickerItemValue);
          }
        }}
      >
        {/* <Picker.Item label="Create a Wiggle" value="" /> */}
        <Picker.Item label="Dog Wiggle" value="dog" />
        <Picker.Item label="Joke Wiggle" value="joke" />
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
          const identifier = await schedulePushNotification({
            content: {
              categoryIdentifier: 'basic',
              title: 'Send A Wiggle',
              subtitle: 'Interactive Noftification',

              body: notificationBody,
              data: { type: 'joke' }
            },
            trigger: null
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
