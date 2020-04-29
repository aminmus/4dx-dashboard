import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useMediaQuery, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import formatMeasureProgress from '../utils/charts/formatMeasureProgress';
import RefreshButton from './elements/RefreshButton';
import OptionsToggleButton from './elements/OptionsToggleButton';
import OptionsButton from './elements/OptionsButton';
import IntervalSpanDialog from './elements/IntervalSpanDialog';
import COLORS from '../style/COLORS';
import { addResource } from '../slices/resources';

import InputMeasuresGoal from './elements/editMode/InputMeasuresGoal';

const { primary, light, danger, gray } = COLORS;

const MeasuresOverTime = ({ measures, measureGoals, editMode, dispatch }) => {
  const match = useMediaQuery('(min-width:600px)');
  const [isEditing, setIsEditing] = useState(false);
  const [intervalSpan, setIntervalSpan] = React.useState('weekly');
  const [measureDatasetData, setMeasureDatasetData] = useState();
  const [targetDatasetData, setTargetDatasetData] = useState();
  const [labelsData, setLabelsData] = useState();
  const [displayMeasures, setDisplayMeasures] = useState(true);
  const [displayTarget, setDisplayTarget] = useState(true);
  const [smoothLine, setSmoothLine] = useState(true);
  const [optionsShow, setOptionsShow] = useState(false);
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  /**
   * Component Styles
   */
  const ChartHeaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: primary
  };

  const ContainerStyle = {
    margin: '10px'
  };

  const OptionsContainerStyle = {
    display: 'flex',
    margin: '10px',
    border: `1px solid ${light}`,
    borderRadius: '10px',
    justifyContent: 'center',
    flexDirection: match ? 'row' : 'column'
  };

  /**
   * Get the latest measure goal
   * Add measure goals can be added on same date- prevent this?
   * Several measure goals with the same date? Use createdAt? updatedAt?
   * Overwrite measure goal if one with current date exists?
   */
  const latestMeasureGoal =
    measureGoals.length > 0
      ? measureGoals.reduce((currentEntry, nextEntry) => {
          return currentEntry.date > nextEntry.date ? currentEntry : nextEntry;
        })
      : [];

  /**
   * The data to render target line
   */
  const { targetDate, measuresAmount } = latestMeasureGoal;

  /**
   * Grab only the measures that are successful as they are the only
   * ones relevant for this graph as it displays Measures Completed
   */
  const allMeasureSuccess = measures.map(entry => {
    return entry.success;
  });

  /**
   * Format data to fit the chart config format (ie arrays of values, not objects)
   */
  const { labels, measuresData, targetData } = formatMeasureProgress(
    allMeasureSuccess,
    targetDate,
    measuresAmount,
    intervalSpan
  );

  /**
   * Chart configuration object that handles data rendering options
   *
   */
  const chartConfig = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          /**
           * Dataset for measure data. Has conditional options for showLine, lineTension that tie into the
           * chart options
           */
          data: measureDatasetData,
          borderColor: primary,
          borderWidth: 2,
          pointRadius: match ? 5 : 1,
          pointBorderWidth: 3,
          pointBackgroundColor: primary,
          fill: false,
          showLine: displayMeasures,
          lineTension: smoothLine ? 0.4 : 0
        },
        {
          /**
           * Dataset for target data. Has conditional options for showLine that tie into the
           * chart options
           */
          data: targetDatasetData,
          spanGaps: true,
          borderColor: danger,
          borderWidth: 0,
          pointRadius: 0,
          pointBorderWidth: 0,
          pointBackgroundColor: danger,
          showLine: displayTarget,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      tooltips: {
        bodyFontSize: 18,
        titleFontSize: 20,
        callbacks: {
          /**
           * Dynamic generation of labels that displays when hovering over datapoint.
           * Rounds the target data as this is calculated (used for slope of target line).
           */
          label: (tooltipItem, data) => {
            const { datasetIndex, value, index } = tooltipItem;
            /**
             * Measures dataset labels
             */
            if (datasetIndex === 0) {
              return `Completed: ${value} Target: ${Math.round(data.datasets[1].data[index])}`;
            }
            /**
             * Target dataset labels
             */
            if (datasetIndex === 1 && index > 0) {
              return `Target: ${Math.round(value)}`;
            }
            return null;
          }
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 500,
              callback(value) {
                /**
                 * Format the x-axis tick values to prevent them from taking
                 * up too much space
                 */
                return moment(value).format('MMMM DD');
              }
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Completed',
              fontColor: primary
            },
            ticks: {
              beginAtZero: false,
              /**
               * Adjust the suggested min and max of the graph for the y-axis.
               * Max: the total amount of measures
               * Min: the lowest value of completed measures (as this is organized by ascending values- a measure completed
               * should not be able to be revoked). Progression of measures SHOULD always be positive.
               */
              suggestedMax: measuresAmount,
              suggestedMin: measuresData[0]
            }
          }
        ]
      },
      legend: {
        display: false
      },
      fill: false
    }
  };

  /**
   * Toggle Options handler
   * @param {Object} e - Event Input
   */
  const toggleOptions = e => {
    e.preventDefault();
    setOptionsShow(!optionsShow);
  };

  /**
   * Toggle Options to display or hide measures line
   * @param {Object} e - Event Input
   */
  const optionsToggleMeasures = e => {
    e.preventDefault();
    setDisplayMeasures(!displayMeasures);
  };

  /**
   * Toggle Options to display or hide target line
   * @param {Object} e - Event Input
   */
  const optionsToggleTarget = e => {
    e.preventDefault();
    setDisplayTarget(!displayTarget);
  };

  /**
   * Toggle Options to smoothen out the line tension
   * @param {Object} e - Event Input
   */
  const optionsToggleSmooth = e => {
    e.preventDefault();
    setSmoothLine(!smoothLine);
  };

  /**
   * Handle saving of measure goals by dispatching
   * an addResource action
   * @param {Object} data - Input Data for Added Measure
   */
  const handleSaveMeasureGoal = data => {
    dispatch(addResource(data));
    setIsEditing(false);
  };

  /**
   * Manually update chart with new instance
   * @param {Object} e - Event Input
   */
  const updateChart = e => {
    e.preventDefault();
    const newChartInstance = new Chart(chartContainer.current, chartConfig);
    setChartInstance(newChartInstance);
  };

  /**
   * Set defaults for chart instance, set local state for chart data.
   * If instance of chart exists, use that- otherwise create new instance.
   * Set datasets in chart instance with data from local state,
   */
  useEffect(() => {
    Chart.defaults.global.defaultFontColor = gray;
    Chart.defaults.global.defaultFontSize = 14;
    setMeasureDatasetData(measuresData);
    setTargetDatasetData(targetData);
    setLabelsData(labels);
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
    if (chartInstance) {
      chartInstance.data.datasets[0].data = measureDatasetData;
      chartInstance.data.datasets[1].data = targetDatasetData;
      chartInstance.data.labels = labelsData;
    }
  }, [
    chartContainer,
    displayMeasures,
    displayTarget,
    smoothLine,
    measures,
    measureGoals,
    targetDate,
    measuresAmount,
    intervalSpan,
    isEditing
  ]);

  return (
    <div style={ContainerStyle}>
      <div style={ChartHeaderStyle}>
        <div className="chart-title">{`Measures ${intervalSpan}`}</div>
        <OptionsToggleButton onClick={toggleOptions} />
        <RefreshButton onClick={updateChart} />
      </div>
      {editMode && (
        <Button onClick={() => setIsEditing(true)} className="px-0 mx-auto">
          <AddCircleIcon className="mr-2 text-warning" />
          Add New Measure Goal
        </Button>
      )}
      <div>
        {optionsShow && (
          <div style={OptionsContainerStyle}>
            <OptionsButton
              text={smoothLine ? 'Set Tense' : 'Set Smooth'}
              onClick={optionsToggleSmooth}
            />
            <OptionsButton
              text={displayMeasures ? 'Hide Measures' : 'Show Measures'}
              onClick={optionsToggleMeasures}
            />
            <OptionsButton
              text={displayTarget ? 'Hide Target' : 'Show Target'}
              onClick={optionsToggleTarget}
            />
            <IntervalSpanDialog setIntervalSpan={setIntervalSpan} intervalSpan={intervalSpan} />
          </div>
        )}
        {isEditing && editMode ? (
          <InputMeasuresGoal
            handleSaveMeasureGoal={handleSaveMeasureGoal}
            measures={measuresAmount}
            date={targetDate}
            setIsEditing={setIsEditing}
          />
        ) : (
          <canvas ref={chartContainer} />
        )}
      </div>
    </div>
  );
};

MeasuresOverTime.defaultProps = {
  measures: [],
  measureGoals: {
    targetDate: '',
    measuresAmount: 0
  }
};

MeasuresOverTime.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  measures: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
  ),
  measureGoals: PropTypes.arrayOf(
    PropTypes.shape({
      targetDate: PropTypes.string,
      measuresAmount: PropTypes.number
    })
  )
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(MeasuresOverTime);
