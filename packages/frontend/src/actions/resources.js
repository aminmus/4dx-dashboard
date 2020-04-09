import fetchData from '../utils/fetchData';
import { FETCH_RESOURCES_START, FETCH_RESOURCES_SUCCESS, FETCH_RESOURCES_ERROR } from './types';

export default function requestResources() {
  return async function requestResourcesThunk(dispatch) {
    dispatch({ type: FETCH_RESOURCES_START });
    try {
      const data = await fetchData();
      return dispatch({
        type: FETCH_RESOURCES_SUCCESS,
        payload: data
      });
    } catch (error) {
      return dispatch({
        type: FETCH_RESOURCES_ERROR,
        payload: error
      });
    }
  };
}
