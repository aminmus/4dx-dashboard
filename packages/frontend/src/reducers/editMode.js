import { TOGGLE_EDIT } from '../actions/types';

const editModeReducer = (state = null, action) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      return { ...state, editModeEnabled: !state.editModeEnabled };
    default:
      return state;
  }
};

export default editModeReducer;
