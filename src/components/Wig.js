import React, { Component } from 'react'

export default class Wig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "nps":
            {
                "description": "From -42 NPS to 10 by the end of October 2019",
                "current": "-18",
                "goal": "8",
                "defineClients": "5",
                "defineText": "Define the Success factors for top 10 clients",
                "implementText": "Implement Client Success Program for top 10 clients"
            },
        }
    }

    render() {
        const { current, description } = this.state.nps;
        return (
            <div className="wig bg-container text-center">
                <h2>WIG</h2>
                <h3 className="wig__statement">{description}</h3>
                <div className="wig__chart">
                    <div className="chart__data" >
                        <span className="wig__label" >NPS</span>
                        <span className="wig__result">{current}</span>
                    </div>
                    <div style={this.wigChartAfter}></div>
                </div>
            </div>
        )
    }
}