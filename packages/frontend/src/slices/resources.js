import { Deserializer, Serializer } from 'jsonapi-serializer';
import { serializeError } from 'serialize-error';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchData, { backendFetch } from '../utils/fetchData';

const { deserialize } = new Deserializer({
  keyForAttribute: 'camelCase'
});

const jsonapiSerializer = new Serializer('Nps', {
  attributes: ['id', 'currentNps', 'goalNps', 'date', 'targetDate', 'createdAt', 'updatedAt']
});

const jsonapiDeserializer = new Deserializer({
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

export const updateResource = createAsyncThunk('resources/update', async ({ id, type, data }) => {
  const requestBody = () => {
    if (type === 'nps') {
      return {
        type: 'Nps',
        currentNps: data.currentNps,
        goalNps: data.goalNps,
        targetDate: data.targetDate
      };
    }
    return {};
  };
  const serializedRequest = await jsonapiSerializer.serialize(requestBody());
  const response = await backendFetch(`${type}/${id}`, 'PUT', serializedRequest);
  const deserializedResponse = await jsonapiDeserializer.deserialize(response);
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
      if (payload.type === 'nps') {
        return {
          ...state,
          data: {
            ...state.data,
            nps: state.data.nps.map(entry => (entry.id === payload.data.id ? payload.data : entry))
          },
          isFetching: false
        };
      }
      return { ...state, isFetching: false };
    },
    [updateResource.rejected]: (state, { payload }) => {
      return { ...state, error: serializeError(payload), isFetching: false };
    }
  }
});

export default resourcesSlice.reducer;
