/* eslint-disable no-plusplus, consistent-return,  default-case */
import moment from 'moment';

/**
 * Return an array of dates consisting of 6 dates
 * The step size between dates depends on the interval input
 * @param {string} interval
 */
const setDates = (interval = 'biweekly') => {
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
      // .format('YYYY-MM-DD');
      endDate = moment().add(4, 'weeks');
      //   .format('YYYY-MM-DD');
      break;
    case 'biweekly':
      /**
       * x number of weeks ahead * number of days per week
       */
      startDate = moment().subtract(8, 'weeks');
      // .format('YYYY-MM-DD');
      endDate = moment().add(8, 'weeks');
      //   .format('YYYY-MM-DD');
      break;
    case 'monthly':
      /**
       * x number of months ahead * number of weeks per month * number of days per week
       */
      startDate = moment().subtract(4, 'months');
      // .format('YYYY-MM-DD');
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
 * @param {Array} measureGoals - An array of measure objects
 */
const setTarget = measureGoals => {
  const data = [];
  measureGoals.forEach(goal => {
    data.push({ x: goal.targetDate, y: goal.measuresAmount });
  });
  data.sort((a, b) => {
    return moment(a).diff(b);
  });
  return data;
};

const setMeasures = (measures, dates, interpolation) => {
  const successfulMeasureDate = measures.filter(measure => measure.success).sort();
  const measureData = dates.reduce((accumulator, date) => {
    let i = 0;
    successfulMeasureDate.forEach(dateToCheck => {
      if (moment(date).isSameOrAfter(dateToCheck.success)) {
        i += 1;
      }
    });
    accumulator.push({ y: i, x: date });
    return accumulator;
  }, []);

  return interpolation
    ? measureData.filter((_dataPoint, index) => {
        return index > 0 && measureData[index].y !== measureData[index - 1].y;
      })
    : measureData;
};

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
          quarter: 'M'
        }
      };
    case 'default':
      break;
  }
};

const setGraphData = (measuresData, targetData, interpolation) => {
  const pointBackgroundColor = [];
  const pointBorderColor = [];
  const pointHoverBackgroundColor = 'white';
  const pointHoverBorderColor = 'red';
  let radius = 0;
  let hoverRadius = 0;
  const measuresValueArray = measuresData.map(measure => measure.y);
  if (!interpolation) {
    measuresValueArray.forEach((value, index) => {
      if (value === measuresValueArray[index - 1] && value === measuresValueArray[index + 1]) {
        pointBackgroundColor.push('transparent');
        pointBorderColor.push('transparent');
      } else {
        pointBackgroundColor.push('white');
        pointBorderColor.push('red');
        radius = 5;
        hoverRadius = 6;
      }
    });
  } else {
    radius = 5;
    hoverRadius = 6;
  }

  return {
    datasets: [
      {
        label: 'Measures',
        data: measuresData || [],
        fill: false,
        pointBackgroundColor,
        pointBorderColor,
        pointHoverBackgroundColor,
        pointHoverBorderColor,
        borderColor: 'green',
        backgroundColor: 'green',
        lineTension: !interpolation ? 0 : 0.5,
        radius,
        hoverRadius
      },
      {
        label: 'Target',
        // data: targetData ? targetData : [],
        data: [],
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
        spanGaps: true,
        lineTension: 0
      }
    ]
  };
};

const setGraphOptions = tickData => {
  return {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Measures'
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
    }
  };
};

export default (measures, measureGoals, interval, interpolation = false) => {
  const dates = setDates(interval);
  const measuresData = setMeasures(measures, dates, interpolation);
  const targetData = setTarget(measureGoals);
  const tickData = setTickData(interval);
  const graphData = setGraphData(measuresData, targetData, interpolation);
  const graphOptions = setGraphOptions(tickData);
  return {
    graphData,
    graphOptions
  };
};
