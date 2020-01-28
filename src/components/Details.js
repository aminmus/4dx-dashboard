import React, { Component } from 'react';
import Progressbar from './Progressbar';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
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


    render() {
        const { clients } = this.state;

        return (
            <div>
                <ol>
                    {clients.map((client, index) => {
                        return (
                            <Progressbar clientName={client.name} clientScore={client.progress} />
                        )
                    })}
                </ol>
            </div>
        )
    }
}
