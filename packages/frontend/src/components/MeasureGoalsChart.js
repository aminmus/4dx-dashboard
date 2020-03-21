/* eslint-disable no-unused-vars, react/prop-types, no-param-reassign, react/jsx-one-expression-per-line, no-shadow, no-unused-expressions */

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import formatMeasureProgress from './formatMeasureProgress';

const updateData = (
  graphInstance,
  newLabels,
  newData,
  newTargetData,
  newHighlightData,
  measureLineShow,
  targetLineShow
) => {
  graphInstance.data.datasets[0].data = newData;
  graphInstance.data.datasets[1].data = newHighlightData;
  graphInstance.data.datasets[2].data = newTargetData;
  graphInstance.data.datasets[0].showLine = measureLineShow;
  graphInstance.data.datasets[2].showLine = targetLineShow;
  graphInstance.data.labels = newLabels;
  graphInstance.update();
};

export default function MeasureGoalsChart(props) {
  const { measures, measuresGoal } = props;
  const { targetDate, targetMeasures } = measuresGoal;
  const chartRef = React.createRef();
  const [graph, setGraph] = useState(null);
  const [measureLineShow, setMeasureLineShow] = useState(true);
  const [targetLineShow, setTargetLineShow] = useState(true);

  const { labels, data } = formatMeasureProgress(measures, targetDate, targetMeasures);
  const { measuresData, targetData, highlightData } = data;

  const setLastPointRadius = (radiusSize, measures) => {
    const array = measures.filter(value => value === 0 || value);
    for (let i = 0; i < array.length; i += 1) {
      i === array.length - 1 ? (array[i] = radiusSize) : (array[i] = 0);
    }
    return array;
  };

  const toggleMeasures = e => {
    e.preventDefault();
    setMeasureLineShow(!measureLineShow);
    updateData(
      graph,
      labels,
      measuresData,
      targetData,
      highlightData,
      measureLineShow,
      targetLineShow
    );
  };

  const toggleTarget = e => {
    e.preventDefault();
    setTargetLineShow(!targetLineShow);
    updateData(
      graph,
      labels,
      measuresData,
      targetData,
      highlightData,
      measureLineShow,
      targetLineShow
    );
  };

  useEffect(() => {
    const detailsChartRef = chartRef.current.getContext('2d');
    Chart.defaults.global.defaultFontColor = '#7C7C7C';
    Chart.defaults.global.defaultFontSize = 14;

    if (!graph) {
      setGraph(
        new Chart(detailsChartRef, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                data: measuresData,
                borderColor: 'rgba(250, 191, 44, 1)',
                borderWidth: 2,
                pointRadius: setLastPointRadius(3, measuresData),
                pointBorderWidth: 0,
                pointBackgroundColor: 'rgba(250, 191, 44, 1)',
                fill: false,
                steppedLine: true,
                showLine: measureLineShow
              },
              {
                data: highlightData,
                borderColor: 'green',
                borderWidth: 3,
                pointRadius: 4,
                pointBorderWidth: 4,
                pointBackgroundColor: 'green',
                fill: false,
                showLine: false,
                hitRadius: 5
              },
              {
                data: targetData,
                spanGaps: true,
                borderColor: ['red'],
                borderWidth: 0,
                pointRadius: 0,
                pointBorderWidth: 0,
                pointBackgroundColor: 'red',
                showLine: targetLineShow,
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Measures Completed Over Time (weekly)',
              fontColor: 'rgba(250, 191, 44, 1)'
            },
            tooltips: {
              bodyFontSize: 18,
              titleFontSize: 20,
              callbacks: {
                title: tooltipItem => {
                  return tooltipItem[0].label === moment().format('YYYY-MM-DD')
                    ? `Today (${tooltipItem[0].label})`
                    : tooltipItem[0].label;
                },
                label: (tooltipItem, data) => {
                  const { datasetIndex, value, index } = tooltipItem;

                  if (datasetIndex === 1 || data.labels[index] === moment().format('YYYY-MM-DD')) {
                    return `Completed: ${value} Target: ${Math.round(
                      data.datasets[2].data[index]
                    )}`;
                  }
                  if (datasetIndex === 2 && index > 0) {
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
                    callback(value, index, values) {
                      if (index % 7 === 0 || index === values[index.length]) {
                        return moment(value).format('MMMM DD');
                      }
                      return null;
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
        })
      );
    } else {
      updateData(
        graph,
        labels,
        measuresData,
        targetData,
        highlightData,
        measureLineShow,
        targetLineShow
      );
    }
  });

  return (
    <div className="chart__nps">
      <canvas id="chart__nps" ref={chartRef} />
      <Button size="sm" onClick={toggleMeasures} variant="warning">
        Toggle Measure Graph
      </Button>{' '}
      <Button size="sm" onClick={toggleTarget} variant="warning">
        Toggle Target Graph
      </Button>
    </div>
  );
}
