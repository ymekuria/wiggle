import React from 'react';

const ContactContext = React.createContext();

export const ContactProvider = ({ children }) => {
  return (
    <ContactContext.Provider value={'test'}>{children}</ContactContext.Provider>
  );
};

export default ContactContext;
