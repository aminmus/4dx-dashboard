import React from 'react';
import StateContext from '../context/state-context';
import Wig from '../components/Wig';
import Lead from '../components/Lead';
import Details from '../components/Details';
import Monitor from '../components/Monitor';
import MeasuresGoalChart from '../components/MeasuresGoalChart';

export default function Home() {
  return (
    <StateContext.Consumer>
      {context => (
        <div className="px-5">
          <div className="row">
            <div className="col-sm">
              <Wig nps={context.nps} />
              <Lead
                nps={context.nps}
                definedStatus={context.definedStatus}
                leadStatus={context.leadStatus}
              />
            </div>
            <div className="col-sm">
              <Details clients={context.clients} />
              <Monitor chart={context.chart} />
              <MeasuresGoalChart
                measures={context.leadStatus}
                measuresGoal={context.measuresGoal}
              />
            </div>
          </div>
        </div>
      )}
    </StateContext.Consumer>
  );
}
