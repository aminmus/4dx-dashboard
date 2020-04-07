import { LOGIN, LOGOUT } from '../actions/types';
import { authState } from '../initialState';

const authReducer = (state = authState, action) => {
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
