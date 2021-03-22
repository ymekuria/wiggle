import React, { createContext, Dispatch, Reducer } from 'react';
import { createDataContext } from './createDataContext';
// import { navigationRef } from '../App';
import { navigationRef } from '../navigation/navigationRef';
type StateType = {
  selectedWiggle: any;
};

// type ActionCreatorsType = {
//   setCurrentContact: (contact: Contact) => void;
//   deleteCurrentContact: () => void;
// };

type ActionType =
  | { type: 'ADD_SELECTED_WIGGLE'; payload: any }
  | { type: 'DELETE_SELECTED_WIGGLE' };

const initialState: StateType = { selectedWiggle: {} };

const selectedWiggleReducer: Reducer<StateType, ActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'ADD_SELECTED_WIGGLE':
      return { selectedWiggle: action.payload };
    case 'DELETE_SELECTED_WIGGLE':
      return { selectedWiggle: {} };
    default:
      return state;
  }
};

const setSelectedWiggle = (dispatch: Dispatch<ActionType>) => {
  return (contact: Contact) => {
    dispatch({ type: 'ADD_SELECTED_WIGGLE', payload: contact });
    //navigate to contactsDispaly here
  };
};
const deleteSelectedWiggle = (dispatch: Dispatch<ActionType>) => {
  return () => {
    dispatch({ type: 'DELETE_SELECTED_WIGGLE' });
  };
};

export const { Context, Provider } = createDataContext(
  selectedWiggleReducer,
  { setSelectedWiggle, deleteSelectedWiggle },
  initialState
);
