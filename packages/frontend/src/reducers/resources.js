import { combineReducers } from 'redux';
import { REQUEST_RESOURCES, RECEIVE_RESOURCES, RESOURCES_ERROR } from '../actions/types';

const resources = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_RESOURCES:
      return action.payload;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case RESOURCES_ERROR:
      return action.error;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case REQUEST_RESOURCES:
      return true;
    case RECEIVE_RESOURCES:
      return false;
    default:
      return state;
  }
};

const resourcesReducer = combineReducers({
  resources,
  isFetching,
  error
});

export default resourcesReducer;
