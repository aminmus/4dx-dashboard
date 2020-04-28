/* eslint-disable import/prefer-default-export */

import { TOGGLE_EDIT, DISABLE_EDIT } from './types';

export const toggleEdit = () => ({
  type: TOGGLE_EDIT
});

export const disableEdit = () => ({
  type: DISABLE_EDIT
});
