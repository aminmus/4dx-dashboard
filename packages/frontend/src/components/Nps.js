import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import RefreshButton from './elements/RefreshButton';
import OptionsToggleButton from './elements/OptionsToggleButton';
import OptionsButton from './elements/OptionsButton';
import COLORS from '../style/COLORS';

const { primary, light, success, gray } = COLORS;

const Nps = props => {
  const match = useMediaQuery('(min-width:600px)');

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
    margin: '10px',
    border: `1px solid ${light}`,
    borderRadius: '10px',
    justifyContent: 'center',
    flexDirection: match ? 'row' : 'column'
  };

  const { chart } = props;
  const { months, target, values } = chart;

  const chartContainer = useRef(null);
  const [optionsShow, setOptionsShow] = useState(false);
  const [chartInstance, setChartInstance] = useState(null);
  const [displayTarget, setDisplayTarget] = useState(true);

  const [npsDatasetData, setNpsDatasetData] = useState([]);
  const [targetDatasetData, setTargetDatasetData] = useState([]);
  const [labelsData, setLabelsData] = useState([]);

  const chartConfig = {
    type: 'line',
    data: {
      labels: labelsData,
      datasets: [
        {
          data: npsDatasetData,
          borderColor: primary,
          borderWidth: 3,
          pointRadius: match ? 5 : 1,
          pointBorderWidth: 3,
          pointBackgroundColor: primary,
          fill: false
        },
        {
          data: targetDatasetData,
          spanGaps: true,
          borderWidth: 2,
          borderColor: success,
          fill: false,
          showLine: displayTarget,
          pointRadius: displayTarget ? 2 : 0
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'NPS',
              fontColor: primary
            },
            ticks: {
              beginAtZero: false,
              suggestedMax: 30,
              suggestedMin: -30
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              callback(value, _index, _values) {
                return value.split(' ')[0];
              }
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
  const optionsToggleTarget = e => {
    e.preventDefault();
    setDisplayTarget(!displayTarget);
  };

  const updateChart = e => {
    e.preventDefault();
    const newChartInstance = new Chart(chartContainer.current, chartConfig);
    setChartInstance(newChartInstance);
  };

  useEffect(() => {
    Chart.defaults.global.defaultFontColor = gray;
    Chart.defaults.global.defaultFontSize = 14;

    let targetArray = [];
    if (target) {
      targetArray = values.map(() => null);
      targetArray[0] = target;
      targetArray[values.length - 1] = target;
    }

    setTargetDatasetData(targetArray);
    setLabelsData(months);
    setNpsDatasetData(values);

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
    if (chartInstance) {
      chartInstance.data.datasets[0].data = npsDatasetData;
      chartInstance.data.datasets[1].data = targetDatasetData;
      chartInstance.data.labels = labelsData;
    }
  }, [chartContainer, months, values, target, displayTarget, npsDatasetData]);

  return (
    <div style={ContainerStyle}>
      <div style={ChartHeaderStyle}>
        <div className="chart-title">Nps (Monthly)</div>
        <OptionsToggleButton onClick={toggleOptions} />
        <RefreshButton onClick={updateChart} />
      </div>
      {optionsShow && (
        <div style={OptionsContainerStyle}>
          <OptionsButton
            text={displayTarget ? 'Hide Target' : 'Show Target'}
            onClick={optionsToggleTarget}
          />
        </div>
      )}
      <canvas ref={chartContainer} />
    </div>
  );
};

Nps.defaultProps = {
  chart: {}
};

Nps.propTypes = {
  chart: PropTypes.shape({
    months: PropTypes.array,
    values: PropTypes.array,
    target: PropTypes.number
  })
};

export default Nps;
