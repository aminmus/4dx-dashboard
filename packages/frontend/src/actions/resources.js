import { Deserializer } from 'jsonapi-serializer';

import { GET_RESOURCES } from './types';
import fetchData from '../utils/fetchData';

const { deserialize } = new Deserializer({
  keyForAttribute: 'camelCase'
});

export default function fetchResources() {
  return async function fetchResourcesThunk(dispatch) {
    try {
      const { nps, clients, measures, measureGoals } = await fetchData();
      return dispatch({
        type: GET_RESOURCES,
        payload: {
          clients: await deserialize(clients),
          nps: await deserialize(nps),
          measures: await deserialize(measures),
          measureGoals: await deserialize(measureGoals)
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
