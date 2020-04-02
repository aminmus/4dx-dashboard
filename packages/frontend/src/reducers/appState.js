import { TOGGLE_EDIT, LOGIN, LOGOUT } from '../actions/types';

const appState = (state = [], action) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      console.log('TOGGLE_EDIT ACTION SENT');
      return { ...state, editMode: !state.editMode };
    case LOGIN:
      console.log('LOGIN ACTION SENT');
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      console.log('LOGOUT ACTION SENT');
      return { ...state, isLoggedIn: false };
    default:
      console.log(state);
      return state;
  }
};

export default appState;
