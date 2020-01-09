import { AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
import { Dispatch } from 'redux';
import { FACEBOOK_APP_ID } from '../utils/config';
import axios from 'axios';
import { ActionTypes } from './types';

// add payload type
interface SignUpAction {
  type: ActionTypes.SIGNUP;
  payload: any;
}

interface FBsignUpAction {
  type: ActionTypes.FB_LOGIN_SUCCESS | ActionTypes.FB_LOGIN_FAIL;
  payload?: any;
}

const baseUrl = 'https://0815f71c.ngrok.io';
export const signUp = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/auth/google`);
      console.log('response ', response);
      dispatch<SignUpAction>({ type: ActionTypes.SIGNUP, payload: response });
    } catch (err) {
      console.log('error: ', err.message);
    }
  };
};

export const facebookLogin = () => async (dispatch: Dispatch) => {
  try {
    await Facebook.initializeAsync(FACEBOOK_APP_ID, 'Wiggle');
    let { token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile']
    });

    console.log('token', token);
  } catch (err) {
    console.log(err);
  }
};
