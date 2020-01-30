import React from 'react';

export default function Lead(props) {
    const { nps, clients } = props;
    const { defineClients, defineText, implementText } = nps;

    const renderDefineSuccess = () => {
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

    const renderImplementSuccess = () => {
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
        return (
            <div>
                <h3 className="implement">{implementText}</h3>
                <div className="implement lead__number">
                    <span class={leadClassName}>{leadStatus}/{leadTotal}</span>
                </div>
            </div>
        )
    }
    return (
        <div className="lead__measures bg-container">
            <h2>LEAD</h2>
            {renderDefineSuccess()}
            {renderImplementSuccess()}
        </div>
    )
}
