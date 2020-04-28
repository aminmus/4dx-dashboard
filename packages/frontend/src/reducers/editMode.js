import { TOGGLE_EDIT, DISABLE_EDIT } from '../actions/types';

const editModeReducer = (state = null, action) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      return { ...state, editModeEnabled: !state.editModeEnabled };
    case DISABLE_EDIT:
      return { ...state, editModeEnabled: false };
    default:
      return state;
  }
};

export default editModeReducer;
