import { Deserializer, Serializer } from 'jsonapi-serializer';
import { serializeError } from 'serialize-error';

import { backendFetch } from '../utils/fetchData';

const jsonapiSerializer = new Serializer('Clients', {
  attributes: ['name', 'createdAt', 'updatedAt', 'Csats', 'Measures'],
  Csats: {
    attributes: ['score', 'date', 'createdAt', 'updatedAt'],
    ref: 'id'
  },
  Measures: {
    attributes: ['description', 'success', 'createdAt', 'updatedAt'],
    ref: 'id'
  }
});

const jsonapiDeserializer = new Deserializer({
  keyForAttribute: 'camelCase'
});

export const CREATE_CLIENT_START = 'CREATE_CLIENT_START';
export const CREATE_CLIENT_ERROR = 'CREATE_CLIENT_ERROR';
export const CREATE_CLIENT_SUCCESS = 'CREATE_CLIENT_SUCCESS';

// const DELETE_CLIENT_START = 'DELETE_CLIENT_START';
// const DELETE_CLIENT_ERROR = 'DELETE_CLIENT_ERROR';
// const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';

// const UPDATE_CLIENT_START = 'UPDATE_CLIENT_START';
// const UPDATE_CLIENT_ERROR = 'UPDATE_CLIENT_ERROR';
// const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';

export default function createClient(newClientInput) {
  return async function createClientThunk(dispatch) {
    dispatch({ type: CREATE_CLIENT_START });
    try {
      const serialized = await jsonapiSerializer.serialize(newClientInput);
      const createdClient = await backendFetch('clients', 'POST', serialized);

      if (createdClient.error) throw createdClient.error;
      return dispatch({
        type: CREATE_CLIENT_SUCCESS,
        payload: {
          client: await jsonapiDeserializer.deserialize(createdClient)
        }
      });
    } catch (error) {
      console.error(error);
      return dispatch({
        type: CREATE_CLIENT_ERROR,
        payload: serializeError(error),
        error: true
      });
    }
  };
}
