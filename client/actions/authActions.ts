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

export interface FBsignUpAction {
  type: ActionTypes.FB_LOGIN_SUCCESS | ActionTypes.FB_LOGIN_FAIL;
  payload?: string;
}

// change for production
const baseUrl = 'https://0815f71c.ngrok.io';
export const signUp = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/auth/google`);
      dispatch<SignUpAction>({ type: ActionTypes.SIGNUP, payload: response });
    } catch (err) {
      console.log('error: ', err.message);
    }
  };
};

export const facebookLogin = () => async (dispatch: Dispatch) => {
  try {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      return dispatch<FBsignUpAction>({
        type: ActionTypes.FB_LOGIN_SUCCESS,
        payload: token,
      });
    }

    executeFblogin(dispatch);
  } catch ({ message }) {
    alert(`Facebook login Error: ${message}`);
  }
};

const executeFblogin = async (dispatch: Dispatch) => {
  console.log('hey');
  try {
    await Facebook.initializeAsync(FACEBOOK_APP_ID);
    let { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    // login fails or user cancels
    if (type === 'cancel') {
      return dispatch<FBsignUpAction>({ type: ActionTypes.FB_LOGIN_FAIL });
    }

    // save token to users device for future auth
    await AsyncStorage.setItem('fb_token', token);

    return dispatch<FBsignUpAction>({
      type: ActionTypes.FB_LOGIN_SUCCESS,
      payload: token,
    });
  } catch ({ message }) {
    alert(`Facebook login Error: ${message}`);
  }
};
