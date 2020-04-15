import {
  FETCH_RESOURCES_START,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR
} from '../actions/types';

const isFetchingReducer = (state = false, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_START:
      return true;
    case FETCH_RESOURCES_ERROR:
      return false;
    case FETCH_RESOURCES_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default isFetchingReducer;
