import {
  CREATE_CLIENT_START,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_ERROR
} from '../actions/clients';

const clientsReducer = (state = null, action) => {
  switch (action.type) {
    case CREATE_CLIENT_START:
      return { isLoading: true };
    case CREATE_CLIENT_SUCCESS:
      return { client: action.payload.client, isLoading: false };
    case CREATE_CLIENT_ERROR:
      console.error(action.payload);
      return { error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default clientsReducer;
