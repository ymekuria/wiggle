import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// redux dev tools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: true,
  predicate: () => process.env.NODE_ENV === 'development'
});

const store = createStore(
  // add root reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
