import { GET_RESOURCES } from '../actions/types';

const resourcesReducer = (state = null, action) => {
  switch (action.type) {
    case GET_RESOURCES:
      console.log('GET_RESOURCES ACTION SENT');
      return action.payload;
    default:
      return state;
  }
};

export default resourcesReducer;
