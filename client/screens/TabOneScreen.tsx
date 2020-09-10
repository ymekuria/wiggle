import React, { useEffect, useState } from 'react';
import { StyleSheet, BackHandler, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Facebook from 'expo-facebook';
import { FACEBOOK_APP_ID } from '../utils/config';
import axios from 'axios';
import * as SMS from 'expo-sms';

import { Text, View } from '../components/Themed';
import _default from '@react-navigation/bottom-tabs/lib/typescript/src/navigators/createBottomTabNavigator';
import useIsSMSAvailable from '../hooks/useIsSMSavailable';

const TabOneScreen = () => {
  const isSMSavailable = useIsSMSAvailable();

  const handleClick = async () => {
    await Facebook.initializeAsync(FACEBOOK_APP_ID);
    let { token, type } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['email']
    });
    console.log({ token, type });
    if (type === 'success') {
      console.log('in type');
      const response = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
      );
      console.log({ response });
    }
  };

  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      <Text style={styles.title}>Tab One</Text>
      <Button title="fbLogin" onPress={handleClick}>
        FBLogin
      </Button>
      <Text style={styles.title}>Can Send SMS {isSMSavailable.toString()}</Text>
    </LinearGradient>
  );
};

// background-image: linear-gradient( 89.2deg,  rgba(191,241,236,1) 22.3%, rgba(109,192,236,1) 84.1% );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default TabOneScreen;
