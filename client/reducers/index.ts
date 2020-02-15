import { combineReducers } from 'redux';
import auth from './authReducer';

export interface StoreState {
  auth: string;
}
export default combineReducers<StoreState>({
  auth
});
