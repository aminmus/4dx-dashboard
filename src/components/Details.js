import React from 'react';
import StateContext from '../context/state-context';
import Progressbar from './Progressbar';

export default function Details() {
        return (
            <StateContext.Consumer>
            {context => (
                <div>
                    <ol>
                        {context.clients.map((client) => {
                            return (
                                <Progressbar 
                                clientName={client.name} 
                                clientScore={client.progress} />
                            )
                        })}
                    </ol>
                </div>
            )}
            </StateContext.Consumer>
        )
}
