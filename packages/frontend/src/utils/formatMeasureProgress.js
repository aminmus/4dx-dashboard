/* eslint-disable no-param-reassign */
import moment from 'moment';

const setInterval = (startDate = null, targetDate = null) => {
  const array = [];
  const start = startDate
    ? moment(startDate).format('YYYY-MM-DD')
    : moment()
        .subtract(2, 'w')
        .format('YYYY-MM-DD');
  const end = targetDate
    ? moment(targetDate).format('YYYY-MM-DD')
    : moment()
        .add(2, 'w')
        .format('YYYY-MM-DD');

  const span = moment(end).diff(start, 'w');
  for (let i = 0; i <= span; i += 1) {
    array.push(
      moment(start)
        .add(i, 'w')
        .format('YYYY-MM-DD')
    );
  }
  return array;
};

const setDataPointsMeasure = (interval = null, measures = null) => {
  return !measures || !interval
    ? []
    : interval.reduce((dataPointArray, date) => {
        let i = 0;
        measures.forEach(measureDate => {
          if (moment(date).isSameOrAfter(measureDate)) {
            i += 1;
          }
        });
        dataPointArray.push(i);
        return dataPointArray;
      }, []);
};

const setDataPointsTarget = (data = null, targetMeasures = null, targetDate = null) => {
  if (data || targetMeasures || targetDate) {
    const targetArray = [];
    const yDelta = targetMeasures - data[0];
    const xDelta = data.length - 1;
    const slope = yDelta / xDelta;
    for (let i = 0; i <= xDelta; i += 1) {
      targetArray.push(i * slope);
    }
    return targetArray;
  }
  return [];
};

export default function(measures, targetDate, targetMeasures) {
  const interval = setInterval(null, targetDate);
  const datapointsMeasure = setDataPointsMeasure(interval, measures);
  const dataPointsTarget = setDataPointsTarget(datapointsMeasure, targetMeasures, targetDate);
  return {
    measuresData: datapointsMeasure,
    targetData: dataPointsTarget,
    labels: interval
  };
}
