import moment from 'moment';
import COLORS from '../../style/COLORS';

const { primary, success, dangerDarker } = COLORS;

/**
 * Return an array of datapoints that has been sorted by ascending date
 * @function
 * @param {Object[]} array A list of datapoints
 * @param {string} array[].x Date
 * @param {Number} array[].y Value
 * @param {string} array[].createdAt createdAt timestamp for data resource
 */
const sortDataPointArrayByDate = array => {
  return array.length > 1 ? array.sort((a, b) => moment(a.x).diff(b.x)) : array;
};

/**
 * Return an array of datapoints where each entry is compared and checked
 * for duplicate months. If a duplicate date is found only use the one with
 * the latest createdAt date
 * @function
 * @param {Object[]} array A list of datapoints
 * @param {string} array[].x Date
 * @param {Number} array[].y Value
 * @param {string} array[].createdAt createdAt timestamp for data resource
 */
const filterDataPointArrayDuplicateMonths = array => {
  return array.reduce((accumulator, dataPoint) => {
    if (accumulator.length === 0) {
      accumulator.push(dataPoint);
    } else if (!moment(dataPoint.x).isSame(accumulator.slice(-1)[0]?.x, 'month')) {
      accumulator.push(dataPoint);
    } else if (moment(dataPoint.createdAt).isAfter(accumulator.slice(-1)[0]?.createdAt)) {
      accumulator.splice(-1, 1, dataPoint);
    }
    return accumulator;
  }, []);
};

/**
 * Return an object containing an array of nps data and one of target data.
 * This data has been sorted and formatted to remove duplicate month entries
 * (only using the latest created entry for that month)
 * @param {Object[]} nps
 * @param {string} nps[].id Unique resoruce identifier
 * @param {string} nps[].date Date when NPS was set
 * @param {string} nps[].targetDate Target date
 * @param {Number} nps[].currentNps Current NPS
 * @param {Number} nps[].goalNps Target NPS
 * @param {string} nps[].createdAt Timestamp for creation of data resource
 * @param {string} nps[].updatedAt Timestamp for last editing of data resource
 */
const setNpsAndTargetGraphPoints = nps => {
  const data = [];
  const target = [];
  nps.forEach(entry => {
    data.push({ x: entry.date, y: entry.currentNps, createdAt: entry.createdAt });
    if (entry.targetDate && entry.goalNps)
      target.push({ x: entry.targetDate, y: entry.goalNps, createdAt: entry.createdAt });
  });

  const sortedData = sortDataPointArrayByDate(data);
  const sortedTarget = sortDataPointArrayByDate(target);

  const filteredData = filterDataPointArrayDuplicateMonths(sortedData);
  const filteredTarget = filterDataPointArrayDuplicateMonths(sortedTarget);

  return {
    npsData: filteredData.map(entry => {
      return { x: entry.x, y: entry.y };
    }),
    targetData: filteredTarget.map(entry => {
      return { x: entry.x, y: entry.y };
    })
  };
};

/**
 * Returns the graph data object
 * @function
 * @param {Object[]} npsData
 * @param {string} npsData[].x Date when NPS was set
 * @param {string} npsData[].y Current NPS
 * @param {Object[]} targetData
 * @param {string} targetData[].x Target date
 * @param {string} targetData[].y Target NPS
 */
const setNpsGraphData = (npsData, targetData = []) => {
  return {
    datasets: [
      {
        label: 'NPS',
        data: npsData || [],
        fill: false,
        borderWidth: 3,
        pointBorderWidth: 3,
        borderColor: primary,
        backgroundColor: primary,
        radius: 3,
        hoverRadius: 6
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
 * Returns the options object to use in rendering the graph
 * @function
 */
const setNpsGraphOptions = () => {
  return {
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            zeroLineColor: dangerDarker
          },

          scaleLabel: {
            display: false,
            labelString: 'NPS',
            fontColor: primary
          },
          ticks: {
            stepSize: 5,
            suggestedMin: -10,
            beginAtZero: true
          }
        }
      ],
      xAxes: [
        {
          type: 'time',
          bounds: 'ticks',
          time: {
            unit: 'month',
            unitStepSize: 1,
            displayFormats: {
              week: 'MMM YYYY'
            }
          }
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
 * @param {Object[]} nps
 * @param {string} nps[].id Unique resoruce identifier
 * @param {string} nps[].date Date when NPS was set
 * @param {string} nps[].targetDate Target date
 * @param {Number} nps[].currentNps Current NPS
 * @param {Number} nps[].goalNps Target NPS
 * @param {string} nps[].createdAt Timestamp for creation of data resource
 * @param {string} nps[].updatedAt Timestamp for last editing of data resource
 */
export default nps => {
  const { npsData, targetData } = setNpsAndTargetGraphPoints(nps);
  const graphData = setNpsGraphData(npsData, targetData);
  const graphOptions = setNpsGraphOptions();
  return {
    graphData,
    graphOptions
  };
};
