import { serializeError } from 'serialize-error';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchData, { backendFetch } from '../utils/fetchData';
import { serializePerType, deserialize } from '../utils/jsonapiSerializing';

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

export const updateResource = createAsyncThunk('resources/update', async ({ id, type, data }) => {
  const serializedRequest = await serializePerType(type, data);
  const response = await backendFetch(`${type}/${id}`, 'PUT', serializedRequest);
  const deserializedResponse = await deserialize(response);
  const payload = { data: deserializedResponse, type };
  return payload;
});

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: null,
  reducers: {},
  extraReducers: {
    [fetchResources.pending]: state => {
      return { ...state, isFetching: true };
    },
    [fetchResources.fulfilled]: (state, { payload }) => {
      return { ...state, data: payload, isFetching: false };
    },
    [fetchResources.rejected]: (state, { payload }) => {
      return { ...state, error: serializeError(payload), isFetching: false };
    },
    [updateResource.pending]: state => {
      return { ...state, isFetching: true };
    },
    [updateResource.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        data: {
          ...state.data,
          [payload.type]: state.data[payload.type].map(entry =>
            entry.id === payload.data.id ? payload.data : entry
          )
        },
        isFetching: false
      };
    },
    [updateResource.rejected]: (state, { payload }) => {
      return { ...state, error: serializeError(payload), isFetching: false };
    }
  }
});

export default resourcesSlice.reducer;
