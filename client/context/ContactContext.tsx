import React, { createContext } from 'react';
import { Contact } from 'expo-contacts';
import createDataContext from './createDataContext';
type ContactContextProps = {
  currentContact: Contact;
  setCurrentContact: (contact: Contact) => void;
};
// const ContactContext = createContext<Partial<ContactContextProps>>({});

const currentContactReducer = (state, action) => {
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

export const { Context, Provider } = createDataContext(
  currentContactReducer,
  { setCurrentContact },
  {}
);
