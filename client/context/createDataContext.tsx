import React, { useReducer, createContext, Reducer } from 'react';

type ProviderPropsType = {
  children: React.ReactNode;
};

export const createDataContext = (reducer, actions, initialState) => {
  const Context = createContext<typeof initialState>(initialState);

  const Provider = ({ children }: ProviderPropsType) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const dispatchActions = {} as typeof actions;
    //looping over all actions passed in and calling them with dispatch to give the action
    //access to the dispatch from the useReducer above. The actions with the dispatch are
    //added to the dispatActions object and passed to the Context provider.
    // ie dispatchActions =  { someAction: () => dispatch({ type: 'SOME_TYPE', payload: somePayload }) }
    for (const action in actions) {
      dispatchActions[action] = actions[action](dispatch);
    }
    console.log('dispatchActions, ', dispatchActions);

    return (
      <Context.Provider value={{ state, ...dispatchActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
