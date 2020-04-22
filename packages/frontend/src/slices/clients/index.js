/* eslint-disable consistent-return, no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import measuresReducer from './measures';

const clientsSlice = createSlice({
  name: 'clients',
  initialState: [],
  reducers: {
    measures: measuresReducer
  },
  extraReducers: {}
});

export default clientsSlice.reducer;
