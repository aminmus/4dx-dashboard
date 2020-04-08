import fetchData from '../utils/fetchData';
import { GET_RESOURCES } from './types';

export default function fetchResources() {
  return async function fetchResourcesThunk(dispatch) {
    try {
      const data = await fetchData();
      return dispatch({
        type: GET_RESOURCES,
        payload: data
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
