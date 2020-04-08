/* eslint-disable import/prefer-default-export */

import { START_LOADING, FINISH_LOADING } from './types';

export const startLoading = type => ({
  type: START_LOADING,
  payload: {
    isLoading: true,
    requestType: type,
    requestStatus: 'in progress'
  }
});
export const finishLoading = (type, status) => ({
  type: FINISH_LOADING,
  payload: {
    isLoading: false,
    requestType: type,
    requestStatus: status
  }
});
