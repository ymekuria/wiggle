import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { WebBrowser } from 'expo';
import { signUp } from '../actions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Button title="signup" onPress={() => dispatch(signUp())} />
      <Text>wiggle</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginHorizontal: 100
  }
});

export default HomeScreen;
