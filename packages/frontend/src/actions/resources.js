import { Deserializer } from 'jsonapi-serializer';
import fetchData from '../utils/fetchData';
import { FETCH_RESOURCES_START, FETCH_RESOURCES_SUCCESS, FETCH_RESOURCES_ERROR } from './types';

const { deserialize } = new Deserializer({
  keyForAttribute: 'camelCase'
});

export default function requestResources() {
  return async function requestResourcesThunk(dispatch) {
    dispatch({ type: FETCH_RESOURCES_START });
    try {
      const { nps, clients, measures, measureGoals } = await fetchData();
      return dispatch({
        type: FETCH_RESOURCES_SUCCESS,
        payload: {
          clients: await deserialize(clients),
          nps: await deserialize(nps),
          measures: await deserialize(measures),
          measureGoals: await deserialize(measureGoals)
        }
      });
    } catch (error) {
      return dispatch({
        type: FETCH_RESOURCES_ERROR,
        payload: error
      });
    }
  };
}
