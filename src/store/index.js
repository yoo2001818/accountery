import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import * as reducers from '../reducer';

export default function configureStore(initialState) {
  let logger;
  if (process.env.NODE_ENV === 'production') {
    logger = () => next => action => next(action);
  } else {
    logger = createLogger();
  }
  let reducer = combineReducers(reducers);
  let middlewares = applyMiddleware(
    thunkMiddleware,
    logger,
  );
  return middlewares(createStore)(reducer, initialState);
}
