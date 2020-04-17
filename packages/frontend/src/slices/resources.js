import { Deserializer } from 'jsonapi-serializer';
import { serializeError } from 'serialize-error';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchData from '../utils/fetchData';

const { deserialize } = new Deserializer({
  keyForAttribute: 'camelCase'
});

export const fetchResources = createAsyncThunk('resources/fetchResources', async () => {
  const { nps, clients, measures, measureGoals } = await fetchData();
  const deserialized = {
    clients: await deserialize(clients),
    nps: await deserialize(nps),
    measures: await deserialize(measures),
    measureGoals: await deserialize(measureGoals)
  };
  return deserialized;
});

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: null,
  reducers: {},
  extraReducers: {
    [fetchResources.pending]: state => {
      return { ...state, isFetching: true };
    },
    [fetchResources.fulfilled]: (state, action) => {
      return { ...state, data: action.payload, isFetching: false };
    },
    [fetchResources.rejected]: (state, action) => {
      return { ...state, error: serializeError(action.payload), isFetching: false };
    }
  }
});

export default resourcesSlice.reducer;
