import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';

type SlideIndicatorProps = {};

const SlideIndicator: React.FC<SlideIndicatorProps> = () => {
  return (
    <View>
      <Text>SlideIndicator</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SlideIndicator;
