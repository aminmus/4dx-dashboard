import React, { Component } from 'react'



export default class Lead extends Component {
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
            "clients": [
                {
                    "name": "Arvid Nordqvist",
                    "progress": "3"
                },
                {
                    "name": "Bauhaus1",
                    "progress": "0"
                },
                {
                    "name": "Björn Borg",
                    "progress": "3"
                },
                {
                    "name": "Dr Denim",
                    "progress": "5"
                },
                {
                    "name": "Elon",
                    "progress": "7"
                },
                {
                    "name": "Engelsson",
                    "progress": "9"
                },
                {
                    "name": "Hydroscand",
                    "progress": "10"
                },
                {
                    "name": "Lantmännen",
                    "progress": "8"
                },
                {
                    "name": "Sc Motors",
                    "progress": "6"
                },
                {
                    "name": "Stiga Sports",
                    "progress": "5"
                }
            ]
        }
    }

    renderDefineSuccess = () => {
        const { defineClients, defineText } = this.state.nps;
        let leadClassName = '';
        if (defineClients < 7) {
            leadClassName = 'text-danger';
        } else if (defineClients >= 8 && defineClients < 9) {
            leadClassName = 'text-warning';
        } else {
            leadClassName = 'text-success';
        }

        return (
            <div>
                <h3 className="define">{defineText}</h3>
                <div className="define lead__number">
                    <span class={leadClassName}>{defineClients}/10</span>
                </div>
            </div>
        );
    }

    renderImplementSuccess = () => {
        const { nps, clients } = this.state;
        let leadStatus = 0;
        let leadTotal = 0;
        let leadClassName = '';
        for (const { progress } of clients) {
            leadTotal += 10;
            leadStatus += parseInt(progress);
        }
        if (leadStatus < leadTotal * 0.7) {
            leadClassName = 'text-danger';
       } else if (leadStatus >= leadTotal * 0.7 && leadStatus <= leadTotal * 0.8) {
            leadClassName = 'text-warning';;
        } else {
            leadClassName = 'text-success';
        }
        console.log(leadClassName )
        return (
            <div>
                <h3 className="implement">{nps.implementText}</h3>
                <div className="implement lead__number">
                    <span class={leadClassName}>{leadStatus}/{leadTotal}</span>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div className="lead__measures bg-container">
                <h2>LEAD</h2>
                {this.renderDefineSuccess()}
                {this.renderImplementSuccess()}
            </div>
        )
    }
}
