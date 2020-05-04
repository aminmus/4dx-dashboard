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
  if (value?.length === 0 || value?.length > 50) {
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

/**
 * Validation for inputNps component
 * @param {Number} nps Nps
 * @param {Number} goalNps Goal Nps
 * @param {String} date Date of Nps input
 * @param {String} targetDate Target date for goal nps
 */
export const inputNpsValidation = (nps, goalNps, date, targetDate) => {
  return {
    errors: {
      nps: validateNps(nps).error ? validateNps(nps).errorMessage : null,
      goalNps: validateNps(goalNps).error ? validateNps(goalNps).errorMessage : null,
      date: validateDate(date).error ? validateDate(date).errorMessage : null,
      targetDate: validateDate(targetDate).error ? validateDate(targetDate).errorMessage : null
    }
  };
};

/**
 * Validation for inputClient component
 * @param {String} name Client name
 */
export const inputClientValidation = name => {
  return {
    errors: {
      clientName: validateName(name).error ? validateName(name).errorMessage : null
    }
  };
};
