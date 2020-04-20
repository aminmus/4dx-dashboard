/* eslint-disable consistent-return, no-param-reassign */

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
      return { ...state, error: payload, isFetching: false };
    },
    [updateResource.pending]: state => {
      return { ...state, isFetching: true };
    },
    // Immer (via redux toolkit) creates a proxy state that prevents direct mutation
    [updateResource.fulfilled]: (state, { payload }) => {
      if (payload.type === 'measures') {
        state.data.measures = [
          ...state.data.measures.map(measure =>
            measure.id === payload.data.id ? payload.data : measure
          )
        ];
        state.data.clients = [
          ...state.data.clients.map(client => {
            const updatedMeasures = client.measures.map(measure =>
              measure.id === payload.data.id ? payload.data : measure
            );
            client.measures = updatedMeasures;
            return client;
          })
        ];
        state.isFetching = false;
      } else if (payload.type === 'clients') {
        state.data.clients = [
          ...state.data.clients.map(client =>
            client.id === payload.data.id ? payload.data : client
          )
        ];
        state.data.measures = [
          ...state.data.measures.map(measure => {
            const updatedClient =
              measure.client.id === payload.data.id ? payload.data : measure.client;
            measure.client = updatedClient;
            return measure;
          })
        ];
        state.isFetching = false;
      } else {
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
      }
    },
    [updateResource.rejected]: (state, { payload }) => {
      return { ...state, error: payload, isFetching: false };
    }
  }
});

export default resourcesSlice.reducer;
