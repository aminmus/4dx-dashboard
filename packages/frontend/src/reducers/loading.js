import { START_LOADING, FINISH_LOADING } from '../actions/types';

const loadingReducer = (state = null, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        requestType: action.payload.requestType,
        requestStatus: action.payload.requestStatus
      };
    case FINISH_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        requestType: action.payload.requestType,
        requestStatus: action.payload.requestStatus
      };
    default:
      return state;
  }
};

export default loadingReducer;
