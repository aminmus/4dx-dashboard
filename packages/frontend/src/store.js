/* eslint-disable no-underscore-dangle */

import { createStore } from 'redux';
import appState from './reducers/appState';
import initialState from './initialState';

const store = createStore(
  appState,
  initialState,
  // To enable redux-devtools chrome debugging [https://github.com/zalmoxisus/redux-devtools-extension]
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
