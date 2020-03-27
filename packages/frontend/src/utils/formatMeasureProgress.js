/* eslint-disable no-param-reassign */
import moment from 'moment';

const setInterval = (startDate = null, targetDate = null, intervalSpan = 'weekly') => {
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
  const end = targetDate
    ? moment(targetDate).format('YYYY-MM-DD')
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

const setDataPointsMeasure = (interval = null, measures = null) => {
  if (measures && interval) {
    return (
      interval
        // Filter away dates after current date
        .filter(date => moment(date).isSameOrBefore(moment()))
        /* 
          Compare array with succesful measures with interval dates.
          Reduce array of dates into corresponding measures completed at that date
        */
        .reduce((dataPointArray, date) => {
          let i = 0;
          measures.forEach(measureDate => {
            if (moment(date).isSameOrAfter(measureDate)) {
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
  measures = null,
  targetMeasures = null,
  targetDate = null
) => {
  if (interval && targetMeasures && targetDate && measures) {
    const targetArray = [];
    const yDelta = targetMeasures - measures[0];
    const xDelta = interval.length - 1;
    const slope = yDelta / xDelta;
    for (let i = 0; i <= xDelta; i += 1) {
      targetArray.push(i * slope);
    }
    return targetArray;
  }
  return [];
};

export default function(measures, targetDate, targetMeasures, intervalSpan) {
  const interval = setInterval(null, targetDate, intervalSpan);
  const datapointsMeasure = setDataPointsMeasure(interval, measures);
  const dataPointsTarget = setDataPointsTarget(
    interval,
    datapointsMeasure,
    targetMeasures,
    targetDate
  );
  return {
    measuresData: datapointsMeasure,
    targetData: dataPointsTarget,
    labels: interval
  };
}
