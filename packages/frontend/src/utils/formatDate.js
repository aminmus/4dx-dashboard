import moment from 'moment';
/**
 * @module
 */

/**
 * Change format of a given date, or get current date if used without arguments
 *
 * @function
 * @param {(string|Object|Number|Date|Array)} [date=undefined] Uses current date if undefined. For a full list of input types see https://momentjs.com/docs/#/parsing/
 * @param {string} [formatType='YYYY-MM-DD']
 * @returns {(string|null)} Date formatted according to given formatType, or null if date input is of an invalid date type
 */
export default function formatDate(date = undefined, formatType = 'YYYY-MM-DD') {
  return moment(date).isValid() ? moment(date).format(formatType) : null;
}
