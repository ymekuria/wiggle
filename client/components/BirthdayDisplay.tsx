import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import { null } from 'mathjs';

type BirthdayDisplayProps = {
  birthday: {
    day: number;
    format: string;
    month: number;
    year: number;
  };
};

const BirthdayDisplay: React.FC<BirthdayDisplayProps> = ({ birthday }) => {
  return ( 
    birthday ? (
    <TouchableOpacity>
      <View style={styles.birthdayContainer}>
        <Text>birthday</Text>
        <Text
          style={styles.birthdayText}
        >{`${birthday?.month}/${birthday?.day}`}</Text>
      </View>
    </TouchableOpacity>
    ) : null
  );
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
