import React, { createContext, Dispatch } from 'react';
import { Contact } from 'expo-contacts';
import { createDataContext } from './createDataContext';
import { Action } from 'redux';

const initialState = { currentContact: {} as Contact };

type ContactContextProps = {
  currentContact: Contact;
  setCurrentContact: (contact: Contact) => void;
};
// const ContactContext = createContext<Partial<ContactContextProps>>({});
type ActionType =
  | { type: 'ADD_CURRENT_CONTACT'; payload: Contact }
  | { type: 'DELETE_CURRENT_CONTACT' };

type ReducerReturnType = {
  currentContact: Contact | {};
};

const currentContactReducer = (
  state: typeof initialState,
  action: ActionType
): ReducerReturnType => {
  switch (action.type) {
    case 'ADD_CURRENT_CONTACT':
      console.log('inside Add reducer');
      console.log('action in reducer', action.payload);
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
