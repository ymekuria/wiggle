import React from 'react';

const ContactContext = React.createContext();
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
  const setCurrentContact = (contact) => {
    dispatch({ type: 'ADD_CURRENT_CONTACT', payload: contact });
  };
  return (
    <ContactContext.Provider value={{ currentContact, setCurrentContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
