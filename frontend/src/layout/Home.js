import React from 'react';
import StateContext from '../context/state-context';
import Wig from '../components/Wig.js';
import Lead from '../components/Lead';
import Details from '../components/Details';
import Monitor from '../components/Monitor';


export default function Home() {
    return (
        <StateContext.Consumer>
            {context => (
                <div className="px-5">
                    <div className="row">
                        <div class="col-sm">
                            <Wig nps={context.nps} />
                            <Lead clients={context.clients} nps={context.nps} />
                        </div>
                        <div class="col-sm">
                            <Details clients={context.clients} />
                            <Monitor chart={context.chart} />
                        </div>
                    </div>
                </div>
            )}
        </StateContext.Consumer>
    )
}
