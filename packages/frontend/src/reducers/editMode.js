import { TOGGLE_EDIT } from '../actions/types';
import { editModeState } from '../initialState';

const editModeReducer = (state = editModeState, action) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      console.log('TOGGLE_EDIT ACTION SENT');
      return { ...state, editMode: !state.editMode };
    default:
      return state;
  }
};

export default editModeReducer;
