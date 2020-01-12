import { FBsignUpAction } from '../actions/authActions';
import { ActionTypes } from '../actions/types';

export default (state: string = undefined, action: FBsignUpAction) => {
  switch (action.type) {
    case ActionTypes.FB_LOGIN_SUCCESS:
      return { fbToken: action.payload };
    case ActionTypes.FB_LOGIN_FAIL:
      return { fbToken: undefined };
    default:
      return state;
  }
};
