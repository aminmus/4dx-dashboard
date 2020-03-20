/* eslint-disable no-plusplus, no-param-reassign */
import moment from 'moment';

/*
 Return an array of dates spanning a range of set increments between the current date and target date
*/
const calDateInterval = (currentDate, targetDate, incrementSize) => {
  const dateInterval = [];
  const differenceWeeks = moment(targetDate).diff(currentDate, 'weeks');

  let date = targetDate;
  for (let i = 0; i <= differenceWeeks * 2; i++) {
    date = moment(date)
      .subtract(incrementSize, 'd')
      .format('YYYY-MM-DD');

    dateInterval.push({
      date,
      measuresCompleted: null
    });
  }
  return dateInterval;
};

/*
 Populate date array with successful measures matching the date.
*/
const populateMeasuresCompleted = (measures, dates, currentDate) => {
  measures.forEach(entry => {
    dates.forEach(item => {
      if (item.measuresCompleted === null && moment(item.date).isSameOrBefore(currentDate)) {
        item.measuresCompleted = 0;
      }
      if (moment(item.date).isSameOrAfter(entry) && moment(item.date).isSameOrBefore(currentDate)) {
        item.measuresCompleted++;
      }
    });
  });
  return dates.reverse();
};

/*
 Return array with start/end values for measures, populate interspersing data with null values
 for ChartJS interpolation
*/
const calcGoalData = (dateMeasureArray, targetDate, targetMeasures) => {
  const target = [];

  for (let k = 0; k <= dateMeasureArray.length - 1; k++) {
    if (k === 0) {
      target.push({
        date: dateMeasureArray[0].date,
        measuresCompleted:
          dateMeasureArray[0].measuresCompleted == null ? 0 : dateMeasureArray[0].measuresCompleted
      });
    } else if (k === dateMeasureArray.length - 1) {
      target.push({
        date: targetDate,
        measuresCompleted: targetMeasures
      });
    } else {
      target.push(null);
    }
  }
  return target;
};

export default function(measures, targetDate, targetMeasures) {
  const successfulMeasures = measures.filter(dateOfSucces => dateOfSucces !== null);

  const currentDate = moment();

  const dateInterval = calDateInterval(currentDate, targetDate, 7);

  const dateIntervalWithMeasures = populateMeasuresCompleted(
    successfulMeasures,
    dateInterval,
    currentDate
  );

  const target = calcGoalData(dateIntervalWithMeasures, targetDate, targetMeasures);

  const results = { current: dateIntervalWithMeasures, target };

  return results;
}
