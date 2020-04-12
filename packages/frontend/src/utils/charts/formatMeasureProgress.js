/* eslint-disable no-param-reassign */
import moment from 'moment';

const setInterval = (startDate = null, goalDate = null, intervalSpan = 'weekly') => {
  const array = [];

  let weeksToAddAndSubtract = 2;
  let intervalTickSpan = 1;

  if (intervalSpan === 'biweekly') {
    weeksToAddAndSubtract = 4;
    intervalTickSpan = 2;
  }
  if (intervalSpan === 'monthly') {
    weeksToAddAndSubtract = 8;
    intervalTickSpan = 4;
  }

  const start = startDate
    ? moment(startDate).format('YYYY-MM-DD')
    : moment()
        .subtract(weeksToAddAndSubtract, 'w')
        .format('YYYY-MM-DD');
  const end = goalDate
    ? moment(goalDate).format('YYYY-MM-DD')
    : moment()
        .add(weeksToAddAndSubtract, 'w')
        .format('YYYY-MM-DD');

  const span = moment(end).diff(start, 'w');

  for (let i = 0; i <= span; i += intervalTickSpan) {
    array.push(
      moment(start)
        .add(i, 'w')
        .format('YYYY-MM-DD')
    );
  }
  return array;
};

const setDataPointsMeasure = (interval = null, measureSuccessDates = null) => {
  if (measureSuccessDates && interval) {
    return (
      interval
        // Filter away dates after current date
        .filter(date => moment(date).isSameOrBefore(moment()))
        /* 
          Compare array with succesful measureSuccessDates with interval dates.
          Reduce array of dates into corresponding measureSuccessDates completed at that date
        */
        .reduce((dataPointArray, date) => {
          let i = 0;
          measureSuccessDates.forEach(successDate => {
            if (moment(date).isSameOrAfter(successDate)) {
              i += 1;
            }
          });
          dataPointArray.push(i);
          return dataPointArray;
        }, [])
    );
  }
  return [];
};

const setDataPointsTarget = (
  interval = null,
  measureSuccessDates = null,
  goalAmountOfMeasures = null,
  goalDate = null
) => {
  if (interval && goalAmountOfMeasures && goalDate && measureSuccessDates) {
    const targetArray = [];
    const yDelta = goalAmountOfMeasures - measureSuccessDates[0];
    const xDelta = interval.length - 1;
    const slope = yDelta / xDelta;
    for (let i = 0; i <= xDelta; i += 1) {
      targetArray.push(i * slope);
    }
    return targetArray;
  }
  return [];
};

export default function(measureSuccessDates, goalDate, goalAmountOfMeasures, intervalSpan) {
  const interval = setInterval(null, goalDate, intervalSpan);
  const datapointsMeasure = setDataPointsMeasure(interval, measureSuccessDates);
  const dataPointsTarget = setDataPointsTarget(
    interval,
    datapointsMeasure,
    goalAmountOfMeasures,
    goalDate
  );
  return {
    measuresData: datapointsMeasure,
    targetData: dataPointsTarget,
    labels: interval
  };
}
