import {
  FETCH_RESOURCES_START,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR
} from '../actions/types';

const resources = (state = null, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_START:
      return { ...state, isFetching: true };
    case FETCH_RESOURCES_SUCCESS:
      return { ...state, data: action.payload, isFetching: false };
    case FETCH_RESOURCES_ERROR:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
};

export default resources;
