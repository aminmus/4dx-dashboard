import { combineReducers } from 'redux';
import {
  FETCH_RESOURCES_START,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_ERROR
} from '../actions/types';

const data = (state = null, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_ERROR:
      return action.error;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
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

const resourcesReducer = combineReducers({
  data,
  isFetching,
  error
});

export default resourcesReducer;
