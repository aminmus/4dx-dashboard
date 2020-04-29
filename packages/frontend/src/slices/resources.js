/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchData, { backendFetch } from '../utils/fetchData';
import { serializePerType, deserialize } from '../utils/jsonapiSerializing';

export const fetchResources = createAsyncThunk('resources/fetchResources', async () => {
  const { nps, clients, measureGoals } = await fetchData();
  const deserialized = {
    clients: await deserialize(clients),
    nps: await deserialize(nps),
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

export const updateMeasure = createAsyncThunk('clients/measures/update', async ({ id, data }) => {
  const requestData = {
    data: {
      type: 'measures',
      attributes: data
    }
  };
  const response = await backendFetch(`measures/${id}`, 'PUT', requestData);
  const deserializedResponse = await deserialize(response);
  const payload = { data: deserializedResponse, clientId: data.clientId };
  return payload;
});

export const addMeasure = createAsyncThunk('clients/measures/create', async ({ data }) => {
  const requestData = {
    data: {
      type: 'measures',
      attributes: data
    }
  };
  const response = await backendFetch('measures', 'POST', requestData);
  const deserializedResponse = await deserialize(response);
  const payload = { data: deserializedResponse, clientId: data.clientId };
  return payload;
});

export const deleteMeasure = createAsyncThunk(
  'clients/measures/delete',
  async ({ id, clientId }) => {
    await backendFetch(`measures/${id}`, 'DELETE');
    const payload = { id, clientId };
    return payload;
  }
);

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
      if (payload.type === 'clients') {
        // UPDATE CLIENT WITH PAYLOAD
        const clientIndex = state.data.clients.findIndex(client => client.id === payload.data.id);

        state.data.clients[clientIndex] = payload.data;
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
      if (payload.type === 'clients') {
        /**
         * Handling eventual missing measures and client properties on payload
         * that happens from API response on create requests
         */
        payload.data.measures = payload.data.measures || [];
        payload.data.csats = payload.data.csats || [];
        state.data.clients.push(payload.data);
      } else {
        state.data[payload.type].push(payload.data);
      }
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
      if (payload.type === 'clients') {
        const clientIndex = state.data.clients.findIndex(client => client.id === payload.data.id);
        state.data.clients.splice(clientIndex, 1);
      } else {
        const typeIndex = state.data[payload.type].findIndex(entry => entry.id === payload.data.id);
        state.data[payload.type].splice(typeIndex, 1);
      }
      state.isFetching = false;
    },
    [deleteResource.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    },
    [updateMeasure.pending]: state => {
      state.isFetching = true;
    },
    [updateMeasure.fulfilled]: (state, { payload }) => {
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
    },
    [updateMeasure.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    },
    [addMeasure.pending]: state => {
      state.isFetching = false;
    },
    [addMeasure.fulfilled]: (state, { payload }) => {
      const clientIndex = state.data.clients.findIndex(client => client.id === payload.clientId);
      state.data.clients[clientIndex].measures.push(payload.data);
      state.isFetching = false;
    },
    [addMeasure.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    },
    [deleteMeasure.pending]: state => {
      state.isFetching = true;
    },
    [deleteMeasure.fulfilled]: (state, { payload }) => {
      const clientIndex = state.data.clients.findIndex(client => client.id === payload.clientId);
      const clientMeasureIndex = state.data.clients[clientIndex].measures.findIndex(
        measure => measure.id === payload.id
      );

      state.data.clients[clientIndex].measures.splice(clientMeasureIndex, 1);
      state.isFetching = false;
    },
    [deleteMeasure.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    }
  }
});

export default resourcesSlice.reducer;
