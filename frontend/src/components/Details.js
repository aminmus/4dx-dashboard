import React from 'react';
import Progressbar from './Progressbar';

export default function Details(props) {
    return (
        <div>
            <ol>
                {props.clients.map((client) => {
                    return (
                        <Progressbar
                            clientName={client.name}
                            clientScore={client.progress} />
                    )
                })}
            </ol>
        </div>
    )
}

