import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { adminReducer, adminSaga, USER_LOGOUT } from 'react-admin';
import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import resourcesReducer from './reducers/resources';
import editModeReducer from './reducers/editMode';
import authReducer from './reducers/auth';
import initialState from './initialState';

export default ({ authProvider, dataProvider, history }) => {
  const reducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    editMode: editModeReducer,
    resources: resourcesReducer,
    auth: authReducer
  });
  const resettableAppReducer = (state, action) =>
    reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all([adminSaga(dataProvider, authProvider)].map(fork));
  };
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25
      })) ||
    compose;

  const store = createStore(
    resettableAppReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history), thunk))
  );
  sagaMiddleware.run(saga);
  return store;
};
