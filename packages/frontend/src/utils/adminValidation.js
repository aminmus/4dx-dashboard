import { required, minLength, maxLength, number, minValue, maxValue, regex } from 'react-admin';
import moment from 'moment';

const compareToCurrentDate = value => {
  if (!value) {
    return 'Must be a valid date';
  }
  if (moment(value).diff(moment(), 'days') < 7) {
    return 'Must be set at least a week after current date';
  }
  return [];
};

export const validateName = [required(), minLength(1), maxLength(50)];
export const validateRequired = [required()];
export const validateDescription = [required(), minLength(5), maxLength(100)];
export const validateScore = [required(), number(), minValue(1), maxValue(10)];
export const validateNps = [required(), number(), minValue(-100), maxValue(100)];
export const validateDate = [
  required(),
  regex(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/, 'Must be a valid date')
];

export const validateGoalDate = [
  compareToCurrentDate,
  required(),
  regex(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/, 'Must be a valid date')
];
