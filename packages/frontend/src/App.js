/* eslint-disable no-console, no-unused-vars, no-shadow */
import React, { useState, useEffect } from 'react';
import {
  // eslint-disable-next-line indent
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
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
import store from './store';

const App = () => {
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

  const [isAuth, setAuth] = useState(isAuthenticated());
  useEffect(() => {
    setAuth(isAuthenticated());
  });

  const handleAuthChange = () => setAuth(isAuthenticated());

  useEffect(() => {
    async function setAppState() {
      try {
        const [npsData, clientsData, measures, measureGoals] = await fetchData();
        if (clientsData.clients.data.length > 0) {
          const clientData = reformatClientData(clientsData.clients);
          setClients(clientData);
          setDefinedStatus(calcDefineClients(clientData));
          setLeadStatus(calcLeads(clientData));
        }
        if (npsData.nps.data.length > 0) {
          setNps(reformatNps(npsData.nps));
          setChart(reformatChart(npsData.nps));
        }
        if (measureGoals.measureGoals.data.length > 0) {
          setMeasuresGoal(reformatMeasureGoals(measureGoals.measureGoals));
        }
        if (measures.measures.data.length > 0) {
          setMeasures(reformatMeasures(measures.measures));
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
        <Provider store={store}>
          <Header handleAuthChange={handleAuthChange} />
        </Provider>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Provider store={store}>
              <Home isAuth={isAuth} />
            </Provider>
          </Route>
        </Switch>
      </Router>
    </StateContext.Provider>
  );
};

export default App;
