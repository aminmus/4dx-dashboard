/* eslint-disable no-unused-vars, no-plusplus, no-console, react/prop-types, react/destructuring-assignment, no-shadow, no-param-reassign */

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
import formatMeasureProgress from './formatMeasureProgress';

export default function MeasuresGoalChart(props) {
  const { targetDate, targetMeasures } = props.measuresGoal;

  formatMeasureProgress();

  // GET THE LATEST 7 WEEKS
  const measuresDates = [
    '2020-02-05',
    '2020-02-12',
    '2020-02-19',
    '2020-02-26',
    '2020-03-04',
    '2020-03-11',
    '2020-03-18'
  ];

  const measuresSuccess = [0, 2, 4, 6, 8, 10, 12];

  // -------------MEASURES COMPLETED LINE GRAPH---------------------//
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const currentDate = new Date().toLocaleDateString('sv-SE', options);
  const startDate = measuresDates[0];

  const cur = moment(currentDate);
  const fin = moment(startDate);
  //   console.log(cur.diff(fin, 'days'));
  //   console.log(fin);
  //   const diff =

  // ---------------------------------------------------------------//

  const chartRef = React.createRef();
  const [graph, setGraph] = useState(null);

  const updateData = (graph, newLabels, newData) => {
    graph.data.datasets[0].data = newData;
    graph.data.labels = newLabels;
    graph.update();
  };

  /* CREATE LINEAR DATA SET: 
  MAX Y : targetMeasures
  MIN Y : FIRT DATAPOINT IN MEASURES
  CALCULATE AMOUNT OF INCREMETNS [LENGTH OF ARRAY] : 14 days / 7 days per step
  
  AMOUNT OF STEPS:
  number of days = targetDate - startDate
  number of array values = 

  LABELS DOES NOT MATTER- THEY WILL MATCH EXISTING DATA
*/

  useEffect(() => {
    const detailsChartRef = chartRef.current.getContext('2d');
    Chart.defaults.global.defaultFontColor = '#7C7C7C';
    Chart.defaults.global.defaultFontSize = 14;

    if (graph === null) {
      setGraph(
        new Chart(detailsChartRef, {
          type: 'line',
          data: {
            // TODO: INSERT LABEL DATA FROM MEASURES
            labels: measuresDates,
            datasets: [
              {
                // TODO: INSERT DATA VALUES FROM MEASURES
                data: [0, 2, 2, 3, 5, 6],
                borderColor: ['rgba(250, 191, 44, 1)'],
                borderWidth: 3,
                pointRadius: 5,
                pointBorderWidth: 3,
                pointBackgroundColor: 'rgba(250, 191, 44, 1)',
                fill: false
              },
              {
                // TODO: INSERT DATA VALUES FROM MEASURES
                data: measuresSuccess,
                borderColor: ['red'],
                borderWidth: 3,
                pointRadius: 5,
                pointBorderWidth: 3,
                pointBackgroundColor: 'red',
                fill: false
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    fontColor: 'pink'
                  },
                  ticks: {
                    beginAtZero: false,
                    suggestedMax: 0,
                    suggestedMin: 16
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
      //   updateData(graph, chart.months, chart.values);
    }
  });

  return (
    <div className="chart__nps">
      <canvas id="chart__nps" ref={chartRef} />
    </div>
  );
}
