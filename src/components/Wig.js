import React from 'react'

export default function Wig(props) {
    const { current, description } = props.nps;
    return (
        <div className="wig bg-container text-center">
            <h2>WIG</h2>
            <h3 className="wig__statement">{description}</h3>
            <div className="wig__chart">
                <div className="chart__data" >
                    <span className="wig__label" >NPS</span>
                    <span className="wig__result">{current}</span>
                </div>
            </div>
        </div>
    )
}