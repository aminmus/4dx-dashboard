import fetchData from '../utils/fetchData';
import { REQUEST_RESOURCES, RECEIVE_RESOURCES, RESOURCES_ERROR } from './types';

export const recieveResources = () => {
  return async function recieveResourcesThunk(dispatch) {
    try {
      const data = await fetchData();
      return dispatch({
        type: RECEIVE_RESOURCES,
        payload: data
      });
    } catch (error) {
      return dispatch({
        type: RESOURCES_ERROR,
        payload: error
      });
    }
  };
};

export const requestResources = () => ({
  type: REQUEST_RESOURCES
});
