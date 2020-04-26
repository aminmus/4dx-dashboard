/* eslint-disable import/no-cycle, import/prefer-default-export */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './App';
import createReduxStore from './createReduxStore';
import * as serviceWorker from './serviceWorker';
import authProvider from './utils/react-admin/authProvider';
import dataProvider from './utils/react-admin/dataProvider';

const history = createBrowserHistory();

export const store = createReduxStore({
  authProvider,
  dataProvider,
  history
});

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
