import React, { createContext } from 'react';
import { Contact } from 'expo-contacts';
import { createDataContext } from './createDataContext';
import { Action } from 'redux';

const initialState = { currentContact: {} };
type ContactContextProps = {
  currentContact: Contact;
  setCurrentContact: (contact: Contact) => void;
};
// const ContactContext = createContext<Partial<ContactContextProps>>({});
type ActionType =
  | { type: 'ADD_CURRENT_CONTACT'; payload: Contact }
  | { type: 'DELETE_CURRENT_CONTACT'; payload: typeof initialState };

type ReducerReturnType =
  | {
      currentContact: Contact;
    }
  | typeof initialState;
const currentContactReducer = (
  state: typeof initialState,
  action: ActionType
): ReducerReturnType => {
  console.log('action in reducer', action.payload);
  switch (action.type) {
    case 'ADD_CURRENT_CONTACT':
      console.log('inside Add reducer');
      return { currentContact: action.payload };
    case 'DELETE_CURRENT_CONTACT':
      return { currentContact: {} };
    default:
      return state;
  }
};
const setCurrentContact = (dispatch) => {
  return (contact: Contact) => {
    dispatch({ type: 'ADD_CURRENT_CONTACT', payload: contact });
  };
};
const deleteCurrentContact = (dispatch) => {
  return () => {
    dispatch({ type: 'ADD_CURRENT_CONTACT' });
  };
};

export const { Context, Provider } = createDataContext(
  currentContactReducer,
  { setCurrentContact, deleteCurrentContact },
  {}
);
