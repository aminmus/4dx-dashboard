import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { adminReducer, adminSaga, USER_LOGOUT } from 'react-admin';
import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import resourcesReducer from './slices/resources';
import editModeReducer from './slices/editMode';
import authReducer from './slices/auth';
import preloadedState from './initialState';

/** @module */

/**
 * Create and return Redux Store
 * @function
 * @param {Object} paramObject { authProvider, dataProvider, history }
 * @returns Redux Store
 */
const createReduxStore = ({ authProvider, dataProvider, history }) => {
  const rootReducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    editMode: editModeReducer,
    resources: resourcesReducer,
    auth: authReducer
  });
  const resettableAppReducer = (state, action) =>
    rootReducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all([adminSaga(dataProvider, authProvider)].map(fork));
  };
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: resettableAppReducer,
    preloadedState,
    middleware: [sagaMiddleware, routerMiddleware(history), ...getDefaultMiddleware()]
  });
  sagaMiddleware.run(saga);

  return store;
};

export default createReduxStore;
