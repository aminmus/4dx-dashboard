import { LOGIN, LOGOUT } from '../actions/types';
import { authState } from '../initialState';

const authReducer = (state = authState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log('LOGIN ACTION SENT');
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      console.log('LOGOUT ACTION SENT');
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
