import { LOGIN, LOGOUT } from './types';

export const setLoginStatus = () => ({
  type: LOGIN
});

export const setLogoutStatus = () => ({
  type: LOGOUT
});
