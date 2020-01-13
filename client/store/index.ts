import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

// redux dev tools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const logger = createLogger({
//   collapsed: true,
//   predicate: () => process.env.NODE_ENV === 'development'
// });

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;
