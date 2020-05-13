/* eslint-disable import/no-cycle */
import { store } from '../../index';
import { setLogoutStatus, setLoginStatus } from '../../slices/auth';
import { disableEdit } from '../../slices/editMode';

/**
 * @module
 */

/**
 * Authentication provider
 * Used by React Admin and custom components for authentication and authorization
 * @type {Object}
 * @property {function} login Called when the user attempts to log in
 * @property {function} logout Called when the user clicks on a logout button
 * @property {function} checkError Called when the API returns an error, will call logout on reject
 * @property {function} checkAuth Called when the user navigates to a new location, to check for authentication
 * @property {function} getPermissions Called when the user navigates to a new location, to check for permissions / roles
 */
const authProvider = {
  login: async ({ username, password }) => {
    const baseUrl = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT}`;
    const request = new Request(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/vnd.api+json' })
    });

    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) throw new Error(response.statusText);

    const { token } = await response.json();
    localStorage.setItem('email', username);
    store.dispatch(setLoginStatus());
    return localStorage.setItem('token', token);
  },
  logout: () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    store.dispatch(setLogoutStatus());
    store.dispatch(disableEdit());
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    if (localStorage.getItem('token')) {
      store.dispatch(setLoginStatus());
      return Promise.resolve();
    }
    store.dispatch(setLogoutStatus());
    store.dispatch(disableEdit());
    return Promise.reject(new Error('Not signed in'));
  },
  getPermissions: () => Promise.resolve()
};

export default authProvider;
