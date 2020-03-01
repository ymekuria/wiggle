import { FBsignUpAction } from '../actions/authActions';
import { ActionTypes } from '../actions/types';

export default (state = '', action: FBsignUpAction) => {
  switch (action.type) {
    case ActionTypes.FB_LOGIN_SUCCESS:
      return { fbAuthToken: action.payload };
    case ActionTypes.FB_LOGIN_FAIL:
      return { fbAuthToken: null };
    default:
      return state;
  }
};
