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
  // Run through all of the successful measures
  measures.forEach(successfulMeasureDate => {
    // For each entry check with the current dateInterval dates
    dates.forEach(dateIntervalEntry => {
      // Setting up the initial count for succesful measures
      if (
        !dateIntervalEntry.measuresCompleted &&
        moment(dateIntervalEntry.date).isSameOrBefore(currentDate)
      ) {
        dateIntervalEntry.measuresCompleted = 0;
      }
      // Add to the count if succesful measure occurs before dateInterval date
      // but before/on the current date
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
const calcTargetData = (dateMeasureArray, targetDate, targetMeasures) => {
  const differenceX = moment(targetDate).diff(dateMeasureArray[0].date, 'd');
  const differenceY = targetMeasures - dateMeasureArray[0].measuresCompleted;
  const slope = differenceY / differenceX;

  const target = [];

  if (targetDate || targetMeasures) {
    for (let k = 0; k < dateMeasureArray.length; k += 1) {
      target.push({
        date: dateMeasureArray[k].date,
        measuresCompleted:
          moment(dateMeasureArray[k].date).diff(dateMeasureArray[0].date, 'd') * slope
      });
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

  const targetArray = calcTargetData(dateIntervalWithMeasures, targetDate, targetMeasures);

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
