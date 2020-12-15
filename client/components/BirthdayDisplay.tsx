import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';

type BirthdayDisplayProps = {};

const BirthdayDisplay: React.FC<BirthdayDisplayProps> = () => {
  return (
    <View>
      <Text>BirthdayDisplay</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BirthdayDisplay;
