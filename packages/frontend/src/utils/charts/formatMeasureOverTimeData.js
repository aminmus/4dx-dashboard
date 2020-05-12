import moment from 'moment';
import COLORS from '../../style/COLORS';

const { primary, success } = COLORS;

/**
 * Return an object with the start and end date based on interval and unit input
 * @function
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
 * Get the delta between two known points
 * @function
 * @param {String} x1 Start Date
 * @param {String} x2 End Date
 * @param {Number} y1 Start Measure Target
 * @param {Number} y2 End Measure Target
 */
const getDelta = (x1, x2, y1, y2) => {
  const xDelta = moment(x2).diff(x1, 'days');
  const yDelta = y2 - y1;
  return yDelta / xDelta;
};

/**
 * Return the y value for a known x value
 * on the line between two points using:
 * y1 = y2 - delta * (x2-x1);
 * @function
 * @param {String} x2 Second known x value (date)
 * @param {Number} y2 Second known y value (value)
 * @param {String} x1 First known x value (date)
 * @param {Number} delta Delta used to calculate new data point
 */
const calculateNewY = (x2, y2, x1, delta) => {
  moment(x2).diff(x1, 'days');
  const y1 = Math.round(y2 - delta * moment(x2).diff(x1, 'days'));
  return { x: x1, y: y1 };
};

/**
 * Return a reformatted array of target values that contains new
 * data points on the edges of the graph to handle measure goals
 * that fall outside the range of the graph
 * @function
 * @param {Array} data Measure goals within the graph span
 * @param {Array} outOfBoundsLeft Measure goals existing before first rendered data point
 * @param {Array} outOfBoundsRight Measure goals existing after last rendered data point
 * @param {Object} firstDataPoint The first rendered data point on the graph
 * @param {String} firstDataPoint.x Target date
 * @param {Number} firstDataPoint.y Target measures amount
 * @param {Object} lastDataPoint The last rendered data point on the graph
 * @param {String} lastDataPoint.x Target date
 * @param {Number} lastDataPoint.y Target measures amount
 */
const generateNewStartAndEndTargetDataPoints = (
  data,
  outOfBoundsLeft,
  outOfBoundsRight,
  firstDataPoint,
  lastDataPoint
) => {
  /**
   * CASE : Target data inside and outside (before) span
   * --> Add new data point at beginning of graph
   */
  if (data.length > 0 && outOfBoundsLeft.length > 0 && outOfBoundsRight.length === 0) {
    /**
     * Need to get corresponding y values for x2
     * This represent the start points of the graph
     */

    const x1 = outOfBoundsLeft.slice(-1)[0]?.x;
    const y1 = outOfBoundsLeft.slice(-1)[0]?.y;

    const x2 = firstDataPoint.x;

    const x3 = data[0]?.x;
    const y3 = data[0]?.y;

    const delta = getDelta(x1, x3, y1, y3);
    const newDataPoint = calculateNewY(x1, y1, x2, delta);
    data.unshift(newDataPoint);
    return data;
  }
  /**
   * CASE : Target data inside and outside (after) span
   * --> Add new data point at the end of the graph
   */
  if (data.length > 0 && outOfBoundsRight.length > 0 && outOfBoundsLeft.length === 0) {
    /**
     * Need to get corresponding y values for x2
     * This represent the end point of the graph
     */

    const x1 = data.slice(-1)[0]?.x;
    const y1 = data.slice(-1)[0]?.y;

    const x2 = lastDataPoint.x;

    const x3 = outOfBoundsRight[0]?.x;
    const y3 = outOfBoundsRight[0]?.y;
    const delta = getDelta(x1, x3, y1, y3);
    const newDataPoint = calculateNewY(x3, y3, x2, delta);
    data.push(newDataPoint);
    return data;
  }

  /**
   * CASE : Target data inside and outside (before and after) span
   * --> Add new data point at beginning and end of the graph
   */
  if (data.length > 0 && outOfBoundsLeft.length > 0 && outOfBoundsRight.length > 0) {
    /**
     * Need to get corresponding y values for x2 and x5
     * These represent the start and end points of the graph respectively
     */

    const x1 = outOfBoundsLeft.slice(-1)[0]?.x;
    const y1 = outOfBoundsLeft.slice(-1)[0]?.y;

    const x2 = firstDataPoint.x;

    const x3 = data[0]?.x;
    const y3 = data[0]?.y;

    const x4 = data.slice(-1)[0]?.x;
    const y4 = data.slice(-1)[0]?.y;

    const x5 = lastDataPoint.x;

    const x6 = outOfBoundsRight[0]?.x;
    const y6 = outOfBoundsRight[0]?.y;

    const delta31 = getDelta(x1, x3, y1, y3);
    const newStartDataPoint = calculateNewY(x3, y3, x2, delta31);
    const delta64 = getDelta(x6, x4, y6, y4);
    const newEndDataPoint = calculateNewY(x6, y6, x5, delta64);
    data.unshift(newStartDataPoint);
    data.push(newEndDataPoint);
    return data;
  }
  /**
   * CASE : Target data outside of span (after and before)
   * --> Add new data point at beginning and end of the graph
   */
  if (data.length === 0 && outOfBoundsRight.length > 0 && outOfBoundsLeft.length > 0) {
    const x1 = outOfBoundsLeft.slice(-1)[0]?.x;
    const y1 = outOfBoundsLeft.slice(-1)[0]?.y;

    const x2 = firstDataPoint?.x;

    const x3 = lastDataPoint?.x;

    const x4 = outOfBoundsRight[0]?.x;
    const y4 = outOfBoundsRight[0]?.y;

    const delta41 = getDelta(x1, x4, y1, y4);
    const newStartDataPoint = calculateNewY(x4, y4, x2, delta41);
    const newEndDataPoint = calculateNewY(x4, y4, x3, delta41);
    data.push(newStartDataPoint);
    data.push(newEndDataPoint);
    return data;
  }
  /**
   * CASE : All target data within span no formatting needed
   */
  return data;
};

/**
 * Return an array of dates used to define the span of the graph
 * @function
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
 * @function
 * @param {Object} firstDataPoint First data point
 * @param {String} firstDataPoint.x First data point date
 * @param {number} firstDataPoint.y First data point measures completed
 * @param {Object} lastDataPoint Last data point
 * @param {String} lastDataPoint.x Last data point date
 * @param {number} lastDataPoint.y Last data point measures completed
 * @param {Array} measureGoals Array of measure goal objects
 */
const setTargetGraphPoints = (firstDataPoint, lastDataPoint, measureGoals) => {
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

  const reformattedData = generateNewStartAndEndTargetDataPoints(
    data,
    outOfBoundsLeft,
    outOfBoundsRight,
    firstDataPoint,
    lastDataPoint
  );

  return reformattedData;
};

/**
 * Returns an array of measure data points (x, y)
 * where x = date and y = number of measures completed
 * @function
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
 * @function
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
        lineTension: 0,
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
 * @function
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
 * Returns the options object to use in rendering the graph
 * @function
 * @param {Object} tickData
 * @param {String} tickData.unit The time unit for formatting ticks (week, months)
 * @param {Number} tickData.unitStepSize The step size between each tick
 * @param {Object} tickData.displayFormats Tick data date label format
 */

const setGraphOptions = tickData => {
  return {
    responsive: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: false,
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
 * @function
 * @param {Array} measures Array of measure objects
 * @param {Array} measureGoals Array of measure objects
 * @param {String} interval The interval of the graph (weekly,biweekly or monthly)
 */
export default (measures, measureGoals, interval) => {
  const dates = setDates(interval);
  const measuresData = setMeasuresGraphPoints(measures, dates);
  const firstDataPoint = measuresData[0];
  const lastDataPoint = measuresData.slice(-1)[0];
  const targetData = setTargetGraphPoints(firstDataPoint, lastDataPoint, measureGoals);
  const tickData = setTickData(interval);
  const graphData = setGraphData(measuresData, targetData);
  const graphOptions = setGraphOptions(tickData);
  return {
    graphData,
    graphOptions
  };
};
