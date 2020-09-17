import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Facebook from 'expo-facebook';

import {
  FACEBOOK_APP_ID,
  AUTH0_CLIENT_ID,
  AUTHORIZATION_ENDPOINT
} from '../utils/config';
import axios from 'axios';
import * as SMS from 'expo-sms';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { Text, View } from '../components/Themed';
import _default from '@react-navigation/bottom-tabs/lib/typescript/src/navigators/createBottomTabNavigator';
import useIsSMSAvailable from '../hooks/useIsSMSavailable';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
console.log(`Redirect URL: ${redirectUri}`); //https://auth.expo.io/@ymekuria/wiggle
const TabOneScreen = () => {
  const isSMSavailable = useIsSMSAvailable();
  const [name, setName] = useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: AUTH0_CLIENT_ID,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce'
      }
    },
    { authorizationEndpoint: AUTHORIZATION_ENDPOINT }
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);

        console.log({ decoded });
        const { name } = decoded;
        setName(name);
      }
    }
  }, [result]);

  const handleClick = async () => {
    console.log('click');
    const jwtToken = result?.params?.id_token;
    const headerConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    };
    let testResponse = await axios.get(
      'http://localhost:3000/authtest',
      headerConfig
    );
    console.log('Testresponse', testResponse.data);
  };

  return (
    <LinearGradient
      colors={['rgba(163,175,243,1)', 'rgba(220,182,232,1)']}
      style={styles.container}
    >
      {name ? (
        <Text style={styles.title}>You are logged in, {name}!</Text>
      ) : (
        <Button
          disabled={!request}
          title="Log in with Auth0"
          onPress={() => promptAsync({ useProxy })}
        />
      )}

      <Text style={styles.title}>Tab One</Text>
      <Button title="Test Auth " onPress={handleClick}></Button>
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
