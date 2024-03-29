import React, { createContext, Dispatch, Reducer } from 'react';
import { Contact } from 'expo-contacts';
import { createDataContext } from './createDataContext';
// import { navigationRef } from '../App';
import { navigationRef } from '../navigation/navigationRef';
type StateType = {
  currentContact: Partial<Contact>;
};

type ActionType =
  | { type: 'ADD_CURRENT_CONTACT'; payload: Contact }
  | { type: 'DELETE_CURRENT_CONTACT' };

const initialState: StateType = { currentContact: {} };

const currentContactReducer: Reducer<StateType, ActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'ADD_CURRENT_CONTACT':
      return { currentContact: action.payload };
    case 'DELETE_CURRENT_CONTACT':
      return { currentContact: {} };
    default:
      return state;
  }
};

const setCurrentContact = (dispatch: Dispatch<ActionType>) => {
  return (contact: Contact) => {
    dispatch({ type: 'ADD_CURRENT_CONTACT', payload: contact });
    navigationRef.current?.navigate('ContactDisplayScreen');
  };
};
const deleteCurrentContact = (dispatch: Dispatch<ActionType>) => {
  return () => {
    dispatch({ type: 'DELETE_CURRENT_CONTACT' });
  };
};

export const { Context, Provider } = createDataContext(
  currentContactReducer,
  { setCurrentContact, deleteCurrentContact },
  initialState
);
