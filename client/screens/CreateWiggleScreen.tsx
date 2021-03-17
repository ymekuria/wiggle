import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';

type CreateWiggleScreenProps = {};

const CreateWiggleScreen: React.FC<CreateWiggleScreenProps> = () => {
  return (
    <View>
      <Text>CreateWiggleScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CreateWiggleScreen;
