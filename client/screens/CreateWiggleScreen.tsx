import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';

import { Picker } from '@react-native-picker/picker';
import { TabOneParamList } from '../navigation/BottomTabNavigator';
import { Text } from '../components/Themed';
import PressableOpacity from '../components/PressableOpacity';
import { useThemeColor } from '../components/Themed';

type CreateWiggleScreenProps = {
  navigation: StackNavigationProp<TabOneParamList>;
};

enum PickerItemValue {
  JokeDisplayScreen = 'JokeDisplayScreen',
  DogPicsDisplayScreen = 'DogPicsDisplayScreen'
}

const CreateWiggleScreen: React.FC<CreateWiggleScreenProps> = ({
  navigation
}) => {
  const pickerItemTextColor = useThemeColor(
    { light: undefined, dark: undefined },
    'text'
  );

  const [wiggleSelection, setWiggleSelection] = useState<PickerItemValue>('');
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      {/* <PressableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          if (wiggleSelection !== '') {
            navigation.navigate(wiggleSelection as PickerItemValue);
          }
        }}
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
          <Picker.Item label="Create a Wiggle" value="" />
          <Picker.Item label="Send a Dog Wiggle" value="DogPicsDisplayScreen" />
          <Picker.Item label="Send a Joke Wiggle" value="JokeDisplayScreen" />
          <Picker.Item label="Schedule a Wiggle" value="ScheduleWiggleScreen" />
        </Picker>
      </TouchableOpacity>
      {/* </View> */}
      {/* </PressableOpacity> */}
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
  picker: {
    width: 300,
    height: 100,
    backgroundColor: 'transparent'
  }
});

export default CreateWiggleScreen;
