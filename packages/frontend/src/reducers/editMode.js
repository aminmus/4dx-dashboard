import { TOGGLE_EDIT } from '../actions/types';

const editModeReducer = (state = null, action) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      console.log('TOGGLE_EDIT ACTION SENT');
      return { ...state, editModeEnabled: !state.editModeEnabled };
    default:
      return state;
  }
};

export default editModeReducer;
