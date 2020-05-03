/**
 * @module InputValidation
 */

import moment from 'moment';

/**
 * Validate NPS input.
 * Must be between -100 and 100
 * @function
 * @param {Number} value Nps
 */
export const validateNps = value => {
  if (value > 100 || value < -100) {
    return {
      error: true,
      errorMessage: 'NPS range between -100 and 100'
    };
  }
  return {
    error: false
  };
};

/**
 * Validate Date input.
 * Must be a valid date between 2000-2030
 * @function
 * @param {String} date Date string
 */
export const validateDate = date => {
  if (date && !moment(date).isValid()) {
    return {
      error: true,
      errorMessage: 'Must be a valid date'
    };
  }
  if (moment(date).isBefore('2000-01-01')) {
    return {
      error: true,
      errorMessage: 'Lower date limit 2000-01-01'
    };
  }
  return {
    error: false
  };
};

/**
 * Validate short text input like client names.
 * Must have a character length of 1-50
 * @function
 * @param {String} value Name
 */
export const validateName = value => {
  if ((value && value.length < 1) || value.length > 50) {
    return {
      error: true,
      errorMessage: 'Must be between 1-50 characters in length'
    };
  }
  return {
    error: false
  };
};

/**
 * Validate longer text input like measure descriptions.
 * Must have a character length of 1-280
 * @function
 * @param {String} value Text
 */
export const validateText = value => {
  if ((value && value.length < 1) || value.length > 280) {
    return {
      error: true,
      errorMessage: 'Must be between 1-280 characters in length'
    };
  }
  return {
    error: false
  };
};
