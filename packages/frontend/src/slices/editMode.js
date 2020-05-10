/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const editModeSlice = createSlice({
  name: 'editMode',
  initialState: { editModeEnabled: false },
  reducers: {
    toggleEdit: state => {
      state.editModeEnabled = !state.editModeEnabled;
    },
    disableEdit: state => {
      state.editModeEnabled = false;
    }
  }
});

export const { toggleEdit, disableEdit } = editModeSlice.actions;
export default editModeSlice.reducer;
