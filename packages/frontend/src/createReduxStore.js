import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { adminReducer, adminSaga, USER_LOGOUT } from 'react-admin';
import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import resourcesReducer from './slices/resources';
import computedReducer from './reducers/computed';
import editModeReducer from './reducers/editMode';
import authReducer from './reducers/auth';
import preloadedState from './initialState';

export default ({ authProvider, dataProvider, history }) => {
  const rootReducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    editMode: editModeReducer,
    resources: resourcesReducer,
    auth: authReducer,
    computed: computedReducer
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
