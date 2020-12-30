import React, { useReducer, createContext } from 'react';

export default (reducer, actions, initialState) => {
  const DataContext = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <DataContext.Provider value={{ state }}>{children}</DataContext.Provider>
    );
  };

  return { DataContext, Provider };
};
