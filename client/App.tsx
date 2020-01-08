import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';

export default (): JSX.Element => {
  return (
    <Provider store={store}>
      <View>
        <Text>Wiggle</Text>
      </View>
    </Provider>
  );
};
