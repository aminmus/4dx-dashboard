/* eslint-disable no-plusplus, consistent-return,  default-case */
import moment from 'moment';
import COLORS from '../style/COLORS';

const { primary, success } = COLORS;

/**
 * Return an array of dates consisting of 6 dates
 * The step size between dates depends on the interval input
 * @param {string} interval
 */
const setDates = interval => {
  /**
   * Generate the first date for the dataset. It will serve as the
   * midpoint for dataset so that the center of the graph will always
   * display the current date
   */
  const dates = [];
  let startDate;

  let endDate;

  /**
   * Set the first label value and the interval step size between dates
   */
  switch (interval) {
    case 'weekly':
      /**
       * x number of weeks ahead * number of days per week
       */

      startDate = moment().subtract(4, 'weeks');

      endDate = moment().add(4, 'weeks');

      break;
    case 'biweekly':
      /**
       * x number of weeks ahead * number of days per week
       */
      startDate = moment().subtract(8, 'weeks');

      endDate = moment().add(8, 'weeks');

      break;
    case 'monthly':
      /**
       * x number of months ahead * number of weeks per month * number of days per week
       */
      startDate = moment().subtract(4, 'months');

      endDate = moment().add(4, 'months');
      break;
    default:
      break;
  }

  const diff = moment(endDate).diff(startDate, 'd');
  /**
   * Push the first value dates array
   */
  dates.push(startDate.format('YYYY-MM-DD'));

  for (let i = 0; i <= diff; i++) {
    dates.push(startDate.add(1, 'days').format('YYYY-MM-DD'));
  }

  return dates;
};

/**
 * Return an array of measure target (amount of successful measures expected)
 *
 * @param {Object} firstDataPoint - An array of measure objects
 * @param {Object} lastDataPoint - An array of measure objects
 * @param {Array} measureGoals - An array of measure objects
 */
const setTarget = (firstDataPoint, lastDataPoint, measureGoals) => {
  const data = [];
  const outOfBoundsLeft = [];
  const outOfBoundsRight = [];

  measureGoals.forEach(goal => {
    if (
      moment(goal.targetDate).isAfter(firstDataPoint.x) &&
      moment(goal.targetDate).isBefore(lastDataPoint.x)
    ) {
      data.push({ x: goal.targetDate, y: goal.measuresAmount });
    } else if (moment(goal.targetDate).isAfter(lastDataPoint.x)) {
      outOfBoundsRight.push({ x: goal.targetDate, y: goal.measuresAmount });
    } else {
      outOfBoundsLeft.push({ x: goal.targetDate, y: goal.measuresAmount });
    }
  });

  let x1 = null;
  let y1 = null;
  let x2 = null;
  let y2 = null;
  let x3 = null;
  let y3 = null;
  let x4 = null;
  let y4 = null;

  /**
   * Sort the data in order of ascendings dates
   */
  if (data.length > 1) {
    data.sort((a, b) => {
      return moment(a.x).diff(b.x);
    });
  }

  /**
   * Possible cases for available target data points
   */
  if (data.length > 0 && outOfBoundsLeft.length > 0 && outOfBoundsRight.length === 0) {
    x1 = outOfBoundsLeft.slice(-1)[0]?.x;
    y1 = outOfBoundsLeft.slice(-1)[0]?.y;
    x2 = data[0]?.x;
    y2 = data[0]?.y;
    const xDelta = moment(x2).diff(x1, 'days');
    const yDelta = y2 - y1;
    const delta = yDelta / xDelta;
    const newX1 = firstDataPoint.x;
    const newXDelta = moment(x2).diff(newX1, 'days');
    const newY1 = Math.round(y2 - delta * newXDelta);
    data.unshift({ x: newX1, y: newY1 });
    return data;
  }
  if (data.length > 0 && outOfBoundsRight.length > 0 && outOfBoundsLeft.length === 0) {
    x1 = data.slice(-1)[0]?.x;
    y1 = data.slice(-1)[0]?.y;
    x2 = outOfBoundsRight[0]?.x;
    y2 = outOfBoundsRight[0]?.y;
    const xDelta = moment(x2).diff(x1, 'days');
    const yDelta = y2 - y1;
    const delta = yDelta / xDelta;
    const newX2 = lastDataPoint.x;
    const newXDelta = moment(newX2).diff(x1, 'days');
    const newY2 = Math.round(y1 + delta * newXDelta);
    data.push({ x: newX2, y: newY2 });
    return data;
  }
  if (data.length > 0 && outOfBoundsLeft.length > 0 && outOfBoundsRight.length > 0) {
    x1 = outOfBoundsLeft.slice(-1)[0]?.x;
    y1 = outOfBoundsLeft.slice(-1)[0]?.y;
    x2 = data[0]?.x;
    y2 = data[0]?.y;
    const x12Delta = moment(x2).diff(x1, 'days');
    const yDelta = y2 - y1;
    const delta12 = yDelta / x12Delta;
    const newX1 = firstDataPoint.x;
    const newX12Delta = moment(x2).diff(newX1, 'days');
    const newY1 = Math.round(y2 - delta12 * newX12Delta);
    data.unshift({ x: newX1, y: newY1 });
    x2 = data.slice(-1)[0]?.x;
    y2 = data.slice(-1)[0]?.y;
    x3 = outOfBoundsRight[0]?.x;
    y3 = outOfBoundsRight[0]?.y;
    const x23Delta = moment(x3).diff(x2, 'days');
    const y23Delta = y3 - y2;
    const delta23 = y23Delta / x23Delta;
    const newX3 = lastDataPoint.x;
    const newX23Delta = moment(newX3).diff(x2, 'days');
    const newY3 = Math.round(y2 + delta23 * newX23Delta);
    data.push({ x: newX3, y: newY3 });
    return data;
  }
  if (data.length === 0 && outOfBoundsRight.length > 0 && outOfBoundsLeft.length > 0) {
    x1 = outOfBoundsLeft.slice(-1)[0]?.x;
    y1 = outOfBoundsLeft.slice(-1)[0]?.y;
    x2 = firstDataPoint?.x;
    x3 = lastDataPoint?.x;
    x4 = outOfBoundsRight[0]?.x;
    y4 = outOfBoundsRight[0]?.y;
    const delta = (y4 - y1) / moment(x4).diff(x1, 'days');
    y2 = y1 + delta * moment(x2).diff(x1, 'days');
    y3 = y4 - delta * moment(x4).diff(x3, 'days');
    data.push({ x: x2, y: y2 });
    data.push({ x: x3, y: y3 });
    return data;
  }
  return data;
};

/**
 * Returns an array of measure data points (x, y)
 * where x = date and y = number of measures completed
 * @param {Object} measures
 * @param {Array} dates
 */

const setMeasures = (measures, dates) => {
  const successfulMeasureDate = measures.filter(measure => measure.success).sort();
  const measureData = dates.reduce((accumulator, date) => {
    let i = 0;
    successfulMeasureDate.forEach(dateToCheck => {
      if (moment(date).isSameOrAfter(dateToCheck.success)) {
        i += 1;
      }
    });
    /**
     * Null the data value to prevent it from rendering if
     * the date exceeds the current date
     */
    accumulator.push({
      y: moment(date).isSameOrBefore(moment()) ? i : null,
      x: date
    });

    return accumulator;
  }, []);

  return measureData;
};

/**
 * Returns the graph data object
 * @param {Array} measuresData
 * @param {Array} targetData
 
 */
const setGraphData = (measuresData, targetData) => {
  const pointBackgroundColor = [];
  const pointBorderColor = [];
  let radius = 0;
  let hoverRadius = 0;
  const measuresValueArray = measuresData.map(measure => measure.y);
  measuresValueArray.forEach((value, index) => {
    if (value === measuresValueArray[index - 1] && value === measuresValueArray[index + 1]) {
      pointBackgroundColor.push('transparent');
      pointBorderColor.push('transparent');
    } else {
      pointBackgroundColor.push(primary);
      pointBorderColor.push(primary);
      radius = 3;
      hoverRadius = 6;
    }
  });

  return {
    datasets: [
      {
        label: 'Measures',
        data: measuresData || [],
        fill: false,
        borderWidth: 3,
        pointBorderWidth: 3,
        pointBackgroundColor,
        pointBorderColor,
        borderColor: primary,
        backgroundColor: 'green',

        radius,
        hoverRadius
      },
      {
        label: 'Target',
        data: targetData || [],
        fill: false,
        borderWidth: 3,
        pointBorderWidth: 3,
        backgroundColor: success,
        borderColor: success,
        spanGaps: true,
        lineTension: 0
      }
    ]
  };
};

/**
 * Returns the tick data formatting object
 * to use in the graph options object
 * @param {String} intervalSpan
 */
const setTickData = intervalSpan => {
  switch (intervalSpan) {
    case 'weekly':
      return {
        unit: 'week',
        unitStepSize: 1,
        displayFormats: {
          week: 'MMM D'
        }
      };
    case 'biweekly':
      return {
        unit: 'week',
        unitStepSize: 2,
        displayFormats: {
          week: 'MMM D'
        }
      };
    case 'monthly':
      return {
        unit: 'month',
        unitStepSize: 1,
        displayFormats: {
          week: 'MMM YYYY'
        }
      };
    case 'default':
      break;
  }
};

/**
 * Returns the options object to use in
 * rendering the graph
 * @param {Object} tickData
 */
const setGraphOptions = tickData => {
  return {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Measures',
            fontColor: primary
          },
          ticks: {
            stepSize: 1,
            beginAtZero: true
          }
        }
      ],
      xAxes: [
        {
          type: 'time',
          bounds: 'ticks',
          time: tickData
        }
      ]
    },
    legend: {
      display: false
    }
  };
};

/**
 * Returns the data and options object for the Measure Over Time graph
 * @param {Object} measures
 * @param {Object} measureGoals
 * @param {String} interval
 */
export default (measures, measureGoals, interval) => {
  const dates = setDates(interval);
  const measuresData = setMeasures(measures, dates);
  const firstDataPoint = measuresData[0];
  const lastDataPoint = measuresData.slice(-1)[0];
  const targetData = setTarget(firstDataPoint, lastDataPoint, measureGoals);
  const tickData = setTickData(interval);
  const graphData = setGraphData(measuresData, targetData);
  const graphOptions = setGraphOptions(tickData);
  return {
    graphData,
    graphOptions
  };
};
