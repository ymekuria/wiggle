import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import store from './store';
import { signUp } from './actions';

export default (): JSX.Element => {
  // const dispatch = useDispatch();
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};
