/* eslint-disable import/no-cycle */
import { store } from '../../index';
import { setLogoutStatus, setLoginStatus } from '../../actions/auth';
import { disableEdit } from '../../actions/editMode';

export default {
  // called when the user attempts to log in
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
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    store.dispatch(setLogoutStatus());
    store.dispatch(disableEdit());
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('email');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    if (localStorage.getItem('email')) {
      store.dispatch(setLoginStatus());
      return Promise.resolve();
    }
    store.dispatch(setLogoutStatus());
    store.dispatch(disableEdit());
    return Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve()
};
