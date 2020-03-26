/* eslint-disable no-unused-vars, react/prop-types, no-param-reassign, react/jsx-one-expression-per-line, no-shadow, no-unused-expressions */

import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import formatMeasureProgress from '../utils/formatMeasureProgress';

/* -------------------------------  STYLES ------------------------------- */
const ChartHeaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'rgba(250, 191, 44, 1)'
};

const ContainerStyle = {
  margin: '10px'
};

const OptionsContainerStyle = {
  margin: '10px',
  border: '1px solid white',
  borderRadius: '10px'
};
const OptionsButton = withStyles({
  label: {
    color: 'black'
  },
  root: {
    backgroundColor: 'rgba(250, 191, 44, 1)',
    margin: '10px',
    '&:hover': {
      backgroundColor: 'rgba(200, 140, 10, 1)',
      borderColor: '#0062cc',
      boxShadow: 'none'
    }
  }
})(Button);

const OptionsToggleButton = withStyles({
  root: {
    color: 'rgba(250, 191, 44, 1)',
    margin: '10px',
    '&:hover': {
      backgroundColor: 'rgba(200, 140, 10, 1)',
      borderColor: '#0062cc',
      boxShadow: 'none'
    },
    '&:focus': {
      outline: 'none'
    }
  }
})(IconButton);

const OptionsToggleIcon = withStyles({
  root: {
    color: 'rgba(250, 191, 44, 1)',
    '&:hover': {
      color: 'white'
    }
  }
})(DehazeIcon);

/* ------------------------------------------------------------------ */

const MeasuresOverTime = props => {
  const { measures, measuresGoal } = props;
  const { targetDate, targetMeasures } = measuresGoal;

  // GET DATA -------------------------------------------
  const { labels, measuresData, targetData } = formatMeasureProgress(
    measures,
    targetDate,
    targetMeasures
  );
  /* --------------------------------------------------------------------- */

  const [measureDatasetData, setMeasureDatasetData] = useState(measuresData);
  const [targetDatasetData, setTargetDatasetData] = useState(targetData);
  const [labelsData, setLabelsData] = useState(labels);

  const [displayMeasures, setDisplayMeasures] = useState(true);
  const [displayTarget, setDisplayTarget] = useState(true);
  const [smoothLine, setSmoothLine] = useState(true);

  const [optionsShow, setOptionsShow] = useState(false);

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

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

  const chartConfig = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          data: measureDatasetData,
          borderColor: 'rgba(250, 191, 44, 1)',
          borderWidth: 2,
          pointRadius: 3,
          pointBorderWidth: 0,
          pointBackgroundColor: 'rgba(250, 191, 44, 1)',
          fill: false,
          showLine: displayMeasures,
          lineTension: smoothLine ? 0.4 : 0
        },
        {
          data: targetDatasetData,
          spanGaps: true,
          borderColor: ['red'],
          borderWidth: 0,
          pointRadius: 0,
          pointBorderWidth: 0,
          pointBackgroundColor: 'red',
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
              labelString: 'Measures Completed',
              fontColor: 'rgba(250, 191, 44, 1)'
            },
            ticks: {
              beginAtZero: false,
              suggestedMax: targetMeasures,
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

  useEffect(() => {
    Chart.defaults.global.defaultFontColor = '#7C7C7C';
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
  }, [chartContainer, displayMeasures, displayTarget, smoothLine]);

  return (
    <div style={ContainerStyle}>
      <div style={ChartHeaderStyle}>
        <div className="chart-title">Measures Over Time (Weekly)</div>
        <OptionsToggleButton
          aria-label="options"
          style={{ marginLeft: '10px' }}
          onClick={toggleOptions}
        >
          <OptionsToggleIcon />
        </OptionsToggleButton>
      </div>
      {optionsShow && (
        <div style={OptionsContainerStyle}>
          <OptionsButton
            color="default"
            size="small"
            variant="contained"
            onClick={optionsToggleSmooth}
          >
            {smoothLine ? 'Set Tense' : 'Set Smooth'}
          </OptionsButton>
          <OptionsButton
            color="default"
            size="small"
            variant="contained"
            onClick={optionsToggleMeasures}
          >
            {displayMeasures ? 'Hide Measures' : 'Show Measures'}
          </OptionsButton>
          <OptionsButton
            color="default"
            size="small"
            variant="contained"
            onClick={optionsToggleTarget}
          >
            {displayTarget ? 'Hide Target' : 'Show Target'}
          </OptionsButton>
        </div>
      )}

      <canvas ref={chartContainer} />
    </div>
  );
};

export default MeasuresOverTime;
