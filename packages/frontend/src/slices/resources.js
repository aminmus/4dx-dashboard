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

export const addResource = createAsyncThunk('resources/create', async ({ type, data }) => {
  const serializedRequest = await serializePerType(type, data);
  const response = await backendFetch(type, 'POST', serializedRequest);
  const deserializedResponse = await deserialize(response);
  const payload = { data: deserializedResponse, type };
  return payload;
});

export const deleteResource = createAsyncThunk('resources/delete', async ({ id, type }) => {
  await backendFetch(`${type}/${id}`, 'DELETE');
  const payload = { data: { id }, type };
  return payload;
});

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: null,
  reducers: {},
  extraReducers: {
    [fetchResources.pending]: state => {
      state.isFetching = true;
    },
    [fetchResources.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isFetching = false;
    },
    [fetchResources.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    },
    [updateResource.pending]: state => {
      state.isFetching = true;
    },
    [updateResource.fulfilled]: (state, { payload }) => {
      if (payload.type === 'measures') {
        const measureIndex = state.data.measures.findIndex(
          measure => measure.id === payload.data.id
        );

        // UPDATE MATCHING MEASURE WITH PAYLOAD
        // CAN'T DIRECTLY OVERWRITE WITH PAYLOAD AS IT DOES NOT CONTAIN CLIENT PROPERTY
        // AND OVERWRITING IT WOULD REMOVE CLIENT PROPERTY FROM MEASURE (USED BELOW)
        state.data.measures[measureIndex].id = payload.data.id;
        state.data.measures[measureIndex].success = payload.data.success;
        state.data.measures[measureIndex].description = payload.data.description;
        state.data.measures[measureIndex].updatedAt = payload.data.updatedAt;

        // FIND AND UPDATE MEASURE IN CLIENT WITH PAYLOAD
        state.data.clients.forEach(client => {
          client.measures.forEach(measure => {
            if (measure.id === payload.data.id) {
              const clientIndex = state.data.clients.indexOf(client);
              const clientMeasureIndex = state.data.clients[clientIndex].measures.indexOf(measure);
              state.data.clients[clientIndex].measures[clientMeasureIndex] = payload.data;
            }
          });
        });
        state.isFetching = false;
      } else if (payload.type === 'clients') {
        // UPDATE CLIENT WITH PAYLOAD
        const clientIndex = state.data.clients.findIndex(client => client.id === payload.data.id);
        state.data.clients[clientIndex] = payload.data;
        // UPDATE MATCHING MEASURES BELONGING TO CLIENT WITH PAYLOAD
        state.data.measures.forEach(measure => {
          if (measure.client.id === payload.data.id) {
            const measureIndex = state.data.measures.indexOf(measure);
            state.data.measures[measureIndex].client = payload.data;
          }
        });
        state.isFetching = false;
      } else {
        const typeIndex = state.data[payload.type].findIndex(entry => entry.id === payload.data.id);
        state.data[payload.type][typeIndex] = payload.data;
        state.isFetching = false;
      }
    },
    [updateResource.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    },
    [addResource.pending]: state => {
      state.isFetching = false;
    },
    [addResource.fulfilled]: (state, { payload }) => {
      state.data.nps.push(payload.data);
      state.isFetching = false;
    },
    [addResource.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    },
    [deleteResource.pending]: state => {
      state.isFetching = true;
    },
    [deleteResource.fulfilled]: (state, { payload }) => {
      if (payload.type === 'measures') {
        const measureIndex = state.data.measures.findIndex(
          measure => measure.id === payload.data.id
        );

        state.data.measures.splice(measureIndex, 1);

        state.data.clients.forEach(client => {
          client.measures.forEach(measure => {
            if (measure.id === payload.data.id) {
              const clientIndex = state.data.clients.indexOf(client);
              const clientMeasureIndex = state.data.clients[clientIndex].measures.indexOf(measure);
              state.data.clients[clientIndex].measures.splice(clientMeasureIndex, 1);
            }
          });
        });
        state.isFetching = false;
      } else if (payload.type === 'clients') {
        const clientIndex = state.data.clients.findIndex(client => client.id === payload.data.id);

        state.data.clients.splice(clientIndex, 1);

        state.data.measures = state.data.measures.filter(
          measure => measure.client.id !== payload.data.id
        );
        state.isFetching = false;
      } else {
        const typeIndex = state.data[payload.type].findIndex(entry => entry.id === payload.data.id);
        state.data[payload.type].splice(typeIndex, 1);
        state.isFetching = false;
      }
    },
    [deleteResource.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    }
  }
});

export default resourcesSlice.reducer;
