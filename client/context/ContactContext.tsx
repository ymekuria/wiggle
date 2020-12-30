import React, { createContext } from 'react';
import { Contact } from 'expo-contacts';
type ContactContextProps = {
  currentContact: Contact;
  setCurrentContact: (contact: Contact) => void;
};
const ContactContext = createContext<Partial<ContactContextProps>>({});

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

export const ContactProvider = ({ children }) => {
  const [currentContact, dispatch] = React.useReducer(
    currentContactReducer,
    {}
  );
  const setCurrentContact = (contact: Contact) => {
    dispatch({ type: 'ADD_CURRENT_CONTACT', payload: contact });
  };
  return (
    <ContactContext.Provider value={{ currentContact, setCurrentContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
