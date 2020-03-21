/* eslint-disable no-param-reassign */
import moment from 'moment';

/*
 Return an array of dates spanning a range of set increments between the current date and target date
*/
const calcDateInterval = (currentDate, targetDate, incrementSize) => {
  const dateInterval = [];
  let date = targetDate || currentDate;
  let dateSpan = null;

  if (moment(date).diff(currentDate, 'days') >= 1) {
    dateSpan = moment(targetDate).diff(currentDate, 'days');
    for (let i = 0; i <= dateSpan * 2; i += 1) {
      date = moment(date)
        .subtract(incrementSize, 'd')
        .format('YYYY-MM-DD');

      dateInterval.push({
        date,
        measuresCompleted: null
      });
    }
  } else {
    dateSpan = 4;
    for (let i = 0; i <= dateSpan * 2; i += 1) {
      if (i !== 0) {
        date = moment(date)
          .subtract(incrementSize, 'd')
          .format('YYYY-MM-DD');
      }
      dateInterval.push({
        date: moment(date).format('YYYY-MM-DD'),
        measuresCompleted: null
      });
    }
  }
  return dateInterval;
};

/*
 Populate date array with successful measures matching the date.
*/
const populateMeasuresCompleted = (measures, dates, currentDate) => {
  measures.forEach(successfulMeasureDate => {
    dates.forEach(dateIntervalEntry => {
      if (
        !dateIntervalEntry.measuresCompleted &&
        moment(dateIntervalEntry.date).isSameOrBefore(currentDate)
      ) {
        dateIntervalEntry.measuresCompleted = 0;
      }
      if (
        moment(dateIntervalEntry.date).isSameOrAfter(successfulMeasureDate) &&
        moment(dateIntervalEntry.date).isSameOrBefore(currentDate)
      ) {
        dateIntervalEntry.measuresCompleted += 1;
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

  if (targetDate || targetMeasures) {
    for (let k = 0; k <= dateMeasureArray.length - 1; k += 1) {
      if (k === 0) {
        target.push({
          date: dateMeasureArray[0].date,
          measuresCompleted: !dateMeasureArray[0].measuresCompleted
            ? 0
            : dateMeasureArray[0].measuresCompleted
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
  }
  return target;
};

const filterDatesAfterCurrentDate = dataSet => {
  return dataSet.filter(dataPoint => moment(dataPoint.date).isSameOrBefore(moment()));
};

const highlightDataChanges = dataSet => {
  const highlights = [];
  highlights.push(dataSet[0].measuresCompleted);
  for (let i = 1; i < dataSet.length; i += 1) {
    if (dataSet[i].measuresCompleted !== dataSet[i - 1].measuresCompleted) {
      highlights.push(dataSet[i].measuresCompleted);
    } else {
      highlights.push(null);
    }
  }
  return highlights;
};

export default function(measures, targetDate, targetMeasures) {
  const successfulMeasures = measures.filter(dateOfSuccess => dateOfSuccess);

  const currentDate = moment();

  const dateInterval = calcDateInterval(currentDate, targetDate, 1);

  const dateIntervalWithMeasures = populateMeasuresCompleted(
    successfulMeasures,
    dateInterval,
    currentDate
  );

  const targetArray = calcGoalData(dateIntervalWithMeasures, targetDate, targetMeasures);

  const filteredArray = filterDatesAfterCurrentDate(dateIntervalWithMeasures);

  const highlightedDataSet = highlightDataChanges(filteredArray);

  return {
    data: {
      measuresData: dateIntervalWithMeasures.map(entry => entry.measuresCompleted),
      targetData: targetArray.map(entry => (entry ? entry.measuresCompleted : null)),
      highlightData: highlightedDataSet
    },
    labels: dateIntervalWithMeasures.map(entry => entry.date)
  };
}
