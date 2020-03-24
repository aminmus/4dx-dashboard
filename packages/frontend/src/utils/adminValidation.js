import { required, minLength, maxLength, number, minValue, maxValue } from 'react-admin';
import moment from 'moment';

const isWeekAfterCurrentDate = value => {
  if (!moment(value).isValid()) {
    return 'Must be a valid date';
  }
  if (moment(value).diff(moment(), 'days') < 7) {
    return 'Must be set at least a week after current date';
  }
  return [];
};

const isNullOrDate = value => {
  if (value && !moment(value).isValid()) {
    return 'Must be a valid date';
  }
  if (moment(value).isBefore('2000-01-01')) {
    return 'Lower date limit 2000-01-01';
  }
  if (moment(value).isAfter('2030-01-01')) {
    return 'Lower date limit 2030-01-01';
  }
  return [];
};

const isDate = value => {
  if (!moment(value).isValid()) {
    return 'Must be a valid date';
  }
  if (moment(value).isBefore('2000-01-01')) {
    return 'Lower date limit 2000-01-01';
  }
  if (moment(value).isAfter('2030-01-01')) {
    return 'Lower date limit 2030-01-01';
  }
  return [];
};

export const validateName = [required(), minLength(1), maxLength(50)];
export const validateRequired = [required()];
export const validateDescription = [required(), minLength(5), maxLength(100)];
export const validateScore = [required(), number(), minValue(1), maxValue(10)];
export const validateNps = [required(), number(), minValue(-100), maxValue(100)];
export const validateDate = [isNullOrDate];
export const validateDateRequired = [required(), isDate];
export const validateGoalDate = [required(), isWeekAfterCurrentDate];
