import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';

import { Picker } from '@react-native-picker/picker';
import { TabOneParamList } from '../navigation/BottomTabNavigator';
import { Text, View } from '../components/Themed';
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
  console.log('navigation', navigation);

  const pickerItemTextColor = useThemeColor(
    { light: undefined, dark: undefined },
    'text'
  );
  console.log('pickerItermColor', pickerItemTextColor);
  const [wiggleSelection, setWiggleSelection] = useState<PickerItemValue>();
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Picker
        style={styles.picker}
        itemStyle={{ color: pickerItemTextColor, height: 100 }}
        selectedValue={wiggleSelection}
        onValueChange={(wiggleSelection) => {
          console.log('item', wiggleSelection);
          navigation.navigate(wiggleSelection as PickerItemValue);
        }}
      >
        <Picker.Item label="Send a Dog Wiggle" value="DogPicsDisplayScreen" />
        <Picker.Item label="Send a Joke Wiggle" value="JokeDisplayScreen" />
        <Picker.Item label="Schedule a Wiggle" value="ScheduleWiggleScreen" />
      </Picker>
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
