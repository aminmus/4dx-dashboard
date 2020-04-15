import moment from 'moment';

// If inputDate is left empty it will return the current date
// The date must first be converted to undefined since moment can't handle a null paramater for date
export default function formatDate(inputDate, formatType = 'YYYY-MM-DD') {
  const date = inputDate === null ? undefined : inputDate;
  return moment(date).format(formatType);
}
