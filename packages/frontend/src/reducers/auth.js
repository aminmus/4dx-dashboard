import { LOGIN, LOGOUT } from '../actions/types';

const authReducer = (state = null, action) => {
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
