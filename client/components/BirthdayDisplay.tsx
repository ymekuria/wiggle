import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Contact } from 'expo-contacts';

import { Text, View } from '../components/Themed';

type BirthdayDisplayProps = {
  birthday: Contact['birthday'];
};

const BirthdayDisplay: React.FC<BirthdayDisplayProps> = ({ birthday }) => {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  };

  return birthday ? (
    <TouchableOpacity>
      <View style={styles.birthdayContainer}>
        <Text>birthday</Text>
        <Text style={styles.birthdayText}>{`${months[birthday.month]} ${
          birthday?.day
        }`}</Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  birthdayContainer: {
    backgroundColor: 'rgba(247,236,250,.3)',
    margin: 10,
    padding: 10
  },
  birthdayText: {
    fontSize: 20
  }
});

export default BirthdayDisplay;
