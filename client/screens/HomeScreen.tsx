import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, facebookLogin } from '../actions';
import joke from '../api/dadJokes';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const fbAuthToken = useSelector(state => {
    return state.auth.fbAuthToken;
  });

  const fetchJoke = async () => {
    let response = await joke.get('/');
    console.log('joke', response);
  };
  return (
    <View style={styles.container}>
      <Button title="Googlesignup" onPress={() => dispatch(signUp())} />
      <Button title="FBsignup" onPress={() => dispatch(facebookLogin())} />
      <Button title="Test Joke" onPress={fetchJoke} />
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
