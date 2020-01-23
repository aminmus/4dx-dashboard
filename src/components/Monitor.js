import React, { Component } from 'react'
import Chart from 'chart.js';

export default class Monitor extends Component {
    chartRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            "months": ["June", "July", "August", "September", "October", "November"],
            "values": [-5, -43, -34, -49, -25, -19]
        }
    }

    componentDidMount() {
        const detailsChartRef = this.chartRef.current.getContext("2d");
            Chart.defaults.global.defaultFontColor = '#7C7C7C';
          Chart.defaults.global.defaultFontFamily = 'Roboto';
          Chart.defaults.global.defaultFontSize = 14;

        new Chart(detailsChartRef, {
            type: 'line',
            data: {
                labels: this.state.months,
                datasets: [{
                    data: this.state.values,
                    borderColor: [
                        'rgba(250, 191, 44, 1)'
                    ],
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBorderWidth: 3,
                    pointBackgroundColor: 'rgba(250, 191, 44, 1)',
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                          fontColor: 'pink',
                        },
                        ticks: {
                          beginAtZero: false,
                          suggestedMax: 30,
                          suggestedMin: -60,
                        }
                    }],

                },
                legend: {
                    display: false
                },
                fill: false
                // responsive: false,
            }
        });
    }
    render() {
        return (
            <div className="chart__nps">
                <canvas 
                id="chart__nps"
                ref={this.chartRef}
                />
            </div>
        )
    }
}
