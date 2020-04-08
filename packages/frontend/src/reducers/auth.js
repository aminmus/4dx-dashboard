import { LOGIN, LOGOUT } from '../actions/types';

const authReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
