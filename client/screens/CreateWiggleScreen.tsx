import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Text, View } from '../components/Themed';
import { useThemeColor } from '../components/Themed';

type CreateWiggleScreenProps = {};

const CreateWiggleScreen: React.FC<CreateWiggleScreenProps> = () => {
  const pickerItemTextColor = useThemeColor(
    { light: undefined, dark: undefined },
    'text'
  );
  console.log('pickerItermColor', pickerItemTextColor);
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Picker
        style={styles.picker}
        itemStyle={{ color: pickerItemTextColor, height: 100 }}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          console.log('itemValue', itemValue)
        }
      >
        <Picker.Item label="Send a Dog Wiggle" value="dog" />
        <Picker.Item label="Send a Joke Wiggle" value="joke" />
      </Picker>
      <Text style={styles.title}>Create a Wiggle</Text>
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
