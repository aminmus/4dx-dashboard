/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deserialize } from '../../utils/jsonapiSerializing';
import { backendFetch } from '../../utils/fetchData';

export const updateMeasure = createAsyncThunk('resources/measures/update', async ({ id, data }) => {
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

export const addMeasure = createAsyncThunk('resources/measures/create', async ({ data }) => {
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

export const deleteMeasure = createAsyncThunk('resources/measures/delete', async ({ id }) => {
  await backendFetch(`measures/${id}`, 'DELETE');
  const payload = { data: { id } };
  return payload;
});

const measuresSlice = createSlice({
  name: 'measures',
  initialState: [],
  reducers: {},
  extraReducers: {
    [updateMeasure.pending]: state => {
      state.isFetching = true;
    },
    [updateMeasure.fulfilled]: (state, { payload }) => {
      if (payload.type === 'measures') {
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
      }
    },
    [updateMeasure.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    },
    [addMeasure.pending]: state => {
      state.isFetching = false;
    },
    [addMeasure.fulfilled]: (state, { payload }) => {
      state.data.clients[payload.data.clientId].measures.push(payload.data);
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
    },
    [deleteMeasure.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    }
  }
});

export default measuresSlice.reducer;
