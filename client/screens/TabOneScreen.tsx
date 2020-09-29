import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Facebook from 'expo-facebook';

import axios from 'axios';
import * as SMS from 'expo-sms';
import * as AuthSession from 'expo-auth-session';

import jwtDecode from 'jwt-decode';
import { Text, View } from '../components/Themed';
import _default from '@react-navigation/bottom-tabs/lib/typescript/src/navigators/createBottomTabNavigator';
import useIsSMSAvailable from '../hooks/useIsSMSavailable';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
console.log(`Redirect URL: ${redirectUri}`);

const TabOneScreen = () => {
  const isSMSavailable = useIsSMSAvailable();

  const handleClick = async () => {};

  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      {name ? (
        <Text style={styles.title}>You are logged in, {name}!</Text>
      ) : (
        <Button
          title="Log in with Auth0"
          onPress={() => console.log('click')}
        />
      )}

      <Text style={styles.title}>Tab One</Text>
      <Button title="Test Auth " onPress={handleClick}></Button>
      <Text style={styles.title}>Can Send SMS {isSMSavailable.toString()}</Text>
    </LinearGradient>
  );
};

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
