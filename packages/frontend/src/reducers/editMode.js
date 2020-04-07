import { TOGGLE_EDIT } from '../actions/types';
import { editModeState } from '../initialState';

const editModeReducer = (state = editModeState, action) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      return { ...state, editModeEnabled: !state.editModeEnabled };
    default:
      return state;
  }
};

export default editModeReducer;
