import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, facebookLogin } from '../actions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const fbAuthToken = useSelector(state => {
    return state.auth.fbAuthToken;
  });

  return (
    <View style={styles.container}>
      <Button title="Googlesignup" onPress={() => dispatch(signUp())} />
      <Button title="FBsignup" onPress={() => dispatch(facebookLogin())} />
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
