import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';

type AvatarDisplayProps = {};

const AvatarDisplay: React.FC<AvatarDisplayProps> = () => {
  return (
    <View>
      <Text>AvatarDisplay</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AvatarDisplay;
