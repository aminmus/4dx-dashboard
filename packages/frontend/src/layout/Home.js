import React from 'react';
import StateContext from '../context/state-context';
import Wig from '../components/Wig';
import Lead from '../components/Lead';
import Details from '../components/Details';
import Monitor from '../components/Monitor';
import MeasureGoalsChart from '../components/MeasureGoalsChart';

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
              {context.chart.values.length > 0 ? (
                <Monitor chart={context.chart} />
              ) : (
                <div className="my-5 p-4 jumbotron text-light bg-dark">
                  No Measure Data Available For NPS graph
                </div>
              )}
              {context.measures.length > 0 ? (
                <MeasureGoalsChart
                  measures={context.measures}
                  measuresGoal={context.measuresGoal}
                />
              ) : (
                <div className="my-5 p-4 jumbotron text-light bg-dark">
                  No Measure Data Available For Measure Over Time Graph
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </StateContext.Consumer>
  );
}
