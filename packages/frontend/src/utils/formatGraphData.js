import moment from 'moment';
import COLORS from '../style/COLORS';

const { primary, success } = COLORS;

/**
 * Return an object with the start and end date based on interval and unit input
 * @param {Number} units The amount of units to add and subtract from the current date
 * @param {String} intervalType The interval of the graph (week or month)
 */
const getStartEndPoints = (units, intervalType) => {
  return {
    startDate: moment().subtract(units, intervalType),
    endDate: moment().add(units, intervalType)
  };
};

/**
 * Return an array of dates used to define the span of the graph
 * @param {String} interval The interval of the graph (weekly,biweekly or monthly)
 */
const setDates = interval => {
  const dates = [];
  let units;
  let intervalType;

  /**
   * Set the first and last date based on the interval parameter
   * Default is set to weekly if no matching case found
   */
  switch (interval) {
    case 'weekly':
      units = 4;
      intervalType = 'week';
      break;
    case 'biweekly':
      units = 8;
      intervalType = 'week';
      break;
    case 'monthly':
      units = 4;
      intervalType = 'month';
      break;
    default:
      units = 4;
      intervalType = 'week';
      break;
  }

  const { startDate, endDate } = getStartEndPoints(units, intervalType);

  const diff = moment(endDate).diff(startDate, 'd');
  dates.push(startDate.format('YYYY-MM-DD'));

  for (let i = 0; i <= diff; i += 1) {
    dates.push(startDate.add(1, 'days').format('YYYY-MM-DD'));
  }

  return dates;
};

/**
 * Return an array of measure targets (amount of successful measures expected
 * by a given target date)
 *
 * @param {Object} firstDataPoint First data point
 * @param {String} firstDataPoint.x First data point date
 * @param {number} firstDataPoint.y First data point measures completed
 * @param {Object} lastDataPoint Last data point
 * @param {String} lastDataPoint.x Last data point date
 * @param {number} lastDataPoint.y Last data point measures completed
 * @param {Array} measureGoals Array of measure goal objects
 */
const setTarget = (firstDataPoint, lastDataPoint, measureGoals) => {
  const data = [];
  /**
   * Array for storing measure goals that fall outside of the
   * graph's range
   */
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

  /**
   * Sort the data in order of ascending dates
   */
  if (data.length > 1) {
    data.sort((a, b) => {
      return moment(a.x).diff(b.x);
    });
  }

  /**
   * Coordinate values used to calculate the various target data points
   */
  let x1 = null;
  let y1 = null;
  let x2 = null;
  let y2 = null;
  let x3 = null;
  let y3 = null;
  let x4 = null;
  let y4 = null;

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
 * @param {Array} measures Array of measure objects
 * @param {Array} dates Array of dates that constitute the span of the graph
 */
const setMeasuresGraphPoints = (measures, dates) => {
  const successfulMeasureDate = measures.filter(measure => measure.success).sort();
  const measureData = dates.reduce((accumulator, date) => {
    let succesfulMeasures = 0;
    successfulMeasureDate.forEach(dateToCheck => {
      if (moment(date).isSameOrAfter(dateToCheck.success)) {
        succesfulMeasures += 1;
      }
    });
    /**
     * Null the data value to prevent it from rendering if
     * the date exceeds the current date
     */
    accumulator.push({
      y: moment(date).isSameOrBefore(moment()) ? succesfulMeasures : null,
      x: date
    });

    return accumulator;
  }, []);

  return measureData;
};

/**
 * Returns the graph data object
 * @param {Array} measuresData Array of measure objects (x,y)
 * @param {Array} targetData Array of measure target objects (x,y)
 */
const setGraphData = (measuresData, targetData) => {
  const pointBackgroundColorArray = [];
  const pointBorderColorArray = [];
  let radius = 0;
  let hoverRadius = 0;
  const measuresValueArray = measuresData.map(measure => measure.y);
  measuresValueArray.forEach((value, index) => {
    if (value === measuresValueArray[index - 1] && value === measuresValueArray[index + 1]) {
      pointBackgroundColorArray.push('transparent');
      pointBorderColorArray.push('transparent');
    } else {
      pointBackgroundColorArray.push(primary);
      pointBorderColorArray.push(primary);
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
        pointBackgroundColor: pointBackgroundColorArray,
        pointBorderColor: pointBorderColorArray,
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
 * Returns the tick data formatting object to use in the graph options object
 * @param {String} interval The interval of the graph (weekly,biweekly or monthly)
 */
const setTickData = interval => {
  switch (interval) {
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
    default:
      return {
        unit: 'week',
        unitStepSize: 1,
        displayFormats: {
          week: 'MMM D'
        }
      };
  }
};

/**
 * Returns the options object to use in
 * rendering the graph
 * @param {Object} tickData
 * @param {Object} tickData.unit The time unit for formatting ticks (week, months)
 * @param {Object} tickData.unitStepSize The step size between each tick
 * @param {Object} tickData.displayFormats Tick data date label format
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
 * @param {Array} measures Array of measure objects
 * @param {Array} measureGoals Array of measure objects
 * @param {String} interval The interval of the graph (weekly,biweekly or monthly)
 */
export default (measures, measureGoals, interval) => {
  const dates = setDates(interval);
  const measuresData = setMeasuresGraphPoints(measures, dates);
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
