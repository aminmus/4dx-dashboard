/* eslint-disable no-unused-vars, react/prop-types, no-param-reassign, react/jsx-one-expression-per-line, no-shadow, no-unused-expressions */

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import formatMeasureProgress from '../utils/formatMeasureProgress';

const updateData = (
  graphInstance,
  newLabels,
  newData,
  newTargetData,
  measureLineShow,
  targetLineShow,
  lineTension
) => {
  graphInstance.data.datasets[0].data = newData;
  graphInstance.data.datasets[1].data = newTargetData;
  graphInstance.data.datasets[0].showLine = measureLineShow;
  graphInstance.data.datasets[1].showLine = targetLineShow;
  graphInstance.data.labels = newLabels;
  graphInstance.data.datasets[0].lineTension = lineTension;
  graphInstance.update();
};

export default function MeasuresOverTime(props) {
  const { measures, measuresGoal } = props;
  const { targetDate, targetMeasures } = measuresGoal;
  const chartRef = React.createRef();
  const [graph, setGraph] = useState(null);
  const [measureLineShow, setMeasureLineShow] = useState(true);
  const [targetLineShow, setTargetLineShow] = useState(true);
  const [lineTension, setLineTension] = useState(0);

  const { labels, measuresData, targetData } = formatMeasureProgress(
    measures,
    targetDate,
    targetMeasures
  );

  const toggleMeasures = e => {
    e.preventDefault();
    setMeasureLineShow(!measureLineShow);
    updateData(
      graph,
      labels,
      measuresData,
      targetData,
      measureLineShow,
      targetLineShow,
      lineTension
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
      measureLineShow,
      targetLineShow,
      lineTension
    );
  };

  const toggleLineTension = e => {
    e.preventDefault();
    setLineTension(lineTension === 0.4 ? 0 : 0.4);
    updateData(
      graph,
      labels,
      measuresData,
      targetData,
      measureLineShow,
      targetLineShow,
      lineTension
    );
  };

  const filterRenderByDate = (measuresData, labels) => {
    return measuresData;
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
                data: filterRenderByDate(measuresData, labels),
                borderColor: 'rgba(250, 191, 44, 1)',
                borderWidth: 2,
                pointRadius: 3,
                pointBorderWidth: 0,
                pointBackgroundColor: 'rgba(250, 191, 44, 1)',
                fill: false,
                showLine: measureLineShow,
                lineTension: 0
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
                label: (tooltipItem, data) => {
                  const { datasetIndex, value, index } = tooltipItem;
                  if (datasetIndex === 0) {
                    return `Completed: ${value} Target: ${Math.round(
                      data.datasets[1].data[index]
                    )}`;
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
        })
      );
    } else {
      updateData(
        graph,
        labels,
        measuresData,
        targetData,
        measureLineShow,
        targetLineShow,
        lineTension
      );
    }
  }, [
    chartRef,
    graph,
    labels,
    measuresData,
    measureLineShow,
    targetData,
    targetLineShow,
    targetMeasures,
    lineTension
  ]);

  return (
    <div className="chart__nps">
      <canvas id="chart__nps" ref={chartRef} />
      <Button size="sm" onClick={toggleMeasures} variant="warning">
        Toggle Measure Graph
      </Button>{' '}
      <Button size="sm" onClick={toggleTarget} variant="warning">
        Toggle Target Graph
      </Button>{' '}
      <Button size="sm" onClick={toggleLineTension} variant="warning">
        Toggle Line Tension
      </Button>
    </div>
  );
}
