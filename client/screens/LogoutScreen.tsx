import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import { useAuth0 } from '../hooks/useAuth0';

type LougoutScreenProps = {};

const LougoutScreen: React.FC<LougoutScreenProps> = () => {
  return (
    <View>
      <Text>LougoutScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LougoutScreen;
