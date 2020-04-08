/* eslint-disable no-console, import/no-cycle */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import fetchData from './utils/fetchData';
import reformatClientData from './utils/reformatClientData';
import calcDefineClients from './utils/calcDefineClients';
import calcLeads from './utils/calcLeads';
import reformatNps from './utils/reformatNps';
import StateContext from './context/state-context';
import Header from './components/Header';
import Home from './layouts/Home';
import Admin from './layouts/Admin';
import reformatChart from './utils/reformatChart';
import reformatMeasureGoals from './utils/reformatMeasureGoals';
import reformatMeasures from './utils/reformatMeasures';
import isAuthenticated from './utils/authentication';

import { setLogoutStatus, setLoginStatus } from './actions/auth';

const App = props => {
  const { history, dispatch } = props;

  const [clients, setClients] = useState([
    { id: 0, name: 'No Clients Available', measures: [], csats: [] }
  ]);

  const [measures, setMeasures] = useState([]);

  const [measuresGoal, setMeasuresGoal] = useState({
    targetMeasures: null,
    targetDate: null
  });

  const [definedStatus, setDefinedStatus] = useState({ totalClients: 0, definedClients: 0 });
  const [leadStatus, setLeadStatus] = useState({ leads: 0, leadsTotal: 0 });
  const [nps, setNps] = useState({
    description: 'N/A',
    current: 0,
    goal: 0,
    targetDate: 'N/A',
    defineText: 'Define the Success factors for listed clients',
    implementText: 'Implement Client Success Program for listed clients'
  });
  const [chart, setChart] = useState({
    months: [],
    values: [],
    target: null
  });

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(setLoginStatus());
    } else {
      dispatch(setLogoutStatus());
    }
    async function setAppState() {
      try {
        const {
          nps: { data: npsData },
          clients: fetchedClients,
          measures: { data: measuresData },
          measureGoals: { data: measureGoalsData }
        } = await fetchData();

        if (fetchedClients.data.length > 0) {
          const reformattedClients = reformatClientData(fetchedClients);
          setClients(reformattedClients);
          setDefinedStatus(calcDefineClients(reformattedClients));
          setLeadStatus(calcLeads(reformattedClients));
        }
        if (npsData.length > 0) {
          setNps(reformatNps(npsData));
          setChart(reformatChart(npsData));
        }
        if (measureGoalsData.length > 0) {
          setMeasuresGoal(reformatMeasureGoals(measureGoalsData));
        }
        if (measuresData.length > 0) {
          setMeasures(reformatMeasures(measuresData));
        }
      } catch (e) {
        console.error(e);
      }
    }
    setAppState();
  }, []);

  return (
    <StateContext.Provider
      value={{
        clients,
        nps,
        chart,
        leadStatus,
        definedStatus,
        measuresGoal,
        measures
      }}
    >
      <Router>
        <Header />
        <Switch>
          <Route path="/admin">
            <Admin history={history} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </StateContext.Provider>
  );
};

App.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(App);
