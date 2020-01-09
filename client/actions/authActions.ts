import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
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

// using redux thunk for async actions
export const facebookLogin = () => async (dispatch: Dispatch) => {
  // first checking if a fb session token is stored on the users device before authenticating
  try {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      return dispatch<FBsignUpAction>({
        type: ActionTypes.FB_LOGIN_SUCCESS,
        payload: token
      });
    } else {
      performFbLogin(dispatch);
    }
  } catch (err) {
    console.log(err);
  }
};

const performFbLogin = async (dispatch: Dispatch) => {
  // will prompt the user to login via a FB modal and return an object with info about the login ie tokens succes/fail
  let { token, type } = await Facebook.logInWithReadPermissionsAsync(
    FACEBOOK_APP_ID,
    {
      permissions: ['public_profile']
    }
  );

  if (type === 'cancel') {
    return dispatch<FBsignUpAction>({ type: ActionTypes.FB_LOGIN_FAIL });
  }

  // saving the fb_token on the users device for future authentication
  await AsyncStorage.setItem('fb_token', token);

  return dispatch<FBsignUpAction>({
    type: ActionTypes.FB_LOGIN_SUCCESS,
    payload: token
  });
};
