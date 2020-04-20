/* eslint-disable no-param-reassign */
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

export const deleteResource = createAsyncThunk('resources/delete', async ({ id, type }) => {
  const response = await backendFetch(`${type}/${id}`, 'DELETE');
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
      return { ...state, error: payload, isFetching: false };
    },
    [deleteResource.pending]: state => {
      state.isFetching = true;
      return state;
    },
    [deleteResource.fulfilled]: (state, { payload }) => {
      if (payload.type === 'measures') {
        state.data.measures = [
          // Remove targeted Measures resource
          ...state.data.measures.filter(measure => measure.id !== payload.id)
        ];
        state.data.clients = [
          // Remove all measures owned by Client from Client resource
          ...state.data.clients.map(client => {
            const updatedMeasures = client.measures.filter(measure => measure.id !== payload.id);
            client.measures = updatedMeasures;
            return client;
          })
        ];
        state.isFetching = false;
        return state;
      }
      if (payload.type === 'clients') {
        console.log(payload);
        state.data.clients = [
          // Remove targeted Client resource
          ...state.data.clients.filter(client => client.id !== payload.id)
        ];
        state.data.measures = [
          // Remove all measures associated to the Client from Measures resource
          ...state.data.measures.filter(measure => measure.client.id !== payload.id)
        ];
        state.isFetching = false;
        return state;
      }
      return {
        ...state,
        data: {
          ...state.data,
          [payload.type]: state.data[payload.type].filter(entry => entry.id !== payload.id)
        },
        isFetching: false
      };
    },
    [deleteResource.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
      return state;
    }
  }
});

export default resourcesSlice.reducer;
