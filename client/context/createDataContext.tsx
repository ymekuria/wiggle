import React, { useReducer, createContext, Reducer } from 'react';

type ProviderPropsType = {
  children: React.ReactNode;
};

export const createDataContext = <A, S, AT, T>(
  reducer: Reducer<S, T>,
  actions: A,
  initialState: S,
  actionCreatorType: AT
) => {
  const Context = createContext<Partial<S & AT>>(initialState);

  const Provider = ({ children }: ProviderPropsType) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const dispatchActions = {} as AT;
    //looping over all actions passed in and calling them with dispatch to give the action
    //access to the dispatch from the useReducer above. The actions with the dispatch are
    //added to the dispatActions object and passed to the Context provider.
    // ie dispatchActions =  { someAction: () => dispatch({ type: 'SOME_TYPE', payload: somePayload }) }
    for (const action in actions) {
      dispatchActions[action] = actions[action](dispatch);
      // actions[action] = actions[action](dispatch);
    }
    console.log('actoions', actions);
    return (
      <Context.Provider value={{ state, ...dispatchActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
