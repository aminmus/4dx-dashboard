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

  const [intervalSpan, setIntervalSpan] = React.useState('weekly');

  const latestMeasureGoal =
    measureGoals.length > 0
      ? measureGoals.reduce((currentEntry, nextEntry) => {
          return currentEntry.date > nextEntry.date ? currentEntry : nextEntry;
        })
      : [];

  const { targetDate, measuresAmount } = latestMeasureGoal;

  const allMeasureSuccess = measures.map(entry => {
    return entry.success;
  });

  const { labels, measuresData, targetData } = formatMeasureProgress(
    allMeasureSuccess,
    targetDate,
    measuresAmount,
    intervalSpan
  );

  const [measureDatasetData, setMeasureDatasetData] = useState(measuresData);
  const [targetDatasetData, setTargetDatasetData] = useState(targetData);
  const [labelsData, setLabelsData] = useState(labels);

  const [displayMeasures, setDisplayMeasures] = useState(true);
  const [displayTarget, setDisplayTarget] = useState(true);
  const [smoothLine, setSmoothLine] = useState(true);
  const [optionsShow, setOptionsShow] = useState(false);
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const chartConfig = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
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
          label: (tooltipItem, data) => {
            const { datasetIndex, value, index } = tooltipItem;
            if (datasetIndex === 0) {
              return `Completed: ${value} Target: ${Math.round(data.datasets[1].data[index])}`;
            }
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

  const toggleOptions = e => {
    e.preventDefault();
    setOptionsShow(!optionsShow);
  };

  const optionsToggleMeasures = e => {
    e.preventDefault();
    setDisplayMeasures(!displayMeasures);
  };
  const optionsToggleTarget = e => {
    e.preventDefault();
    setDisplayTarget(!displayTarget);
  };
  const optionsToggleSmooth = e => {
    e.preventDefault();
    setSmoothLine(!smoothLine);
  };

  const handleSaveMeasureGoal = data => {
    dispatch(addResource(data));
    setIsEditing(false);
  };

  const updateChart = e => {
    e.preventDefault();
    const newChartInstance = new Chart(chartContainer.current, chartConfig);
    setChartInstance(newChartInstance);
  };

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
        {isEditing ? (
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
