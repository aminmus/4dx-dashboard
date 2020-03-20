/* eslint-disable no-console, no-unused-vars, no-shadow */
import React, { useState, useEffect } from 'react';
import {
  // eslint-disable-next-line indent
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import fetchData from './fetchData';
import reformatClientData from './reformatClientData';
import calcDefineClients from './calcDefineClients';
import calcLeads from './calcLeads';
import reformatNps from './reformatNps';
import StateContext from './context/state-context';
import Header from './components/Header';
import Home from './layout/Home';
import Login from './layout/Login';
import reformatChart from './reformatChart';
import reformatMeasureGoals from './reformatMeasureGoals';
import reformatMeasures from './reformatMeasures';

export default function App() {
  const [clients, setClients] = useState([
    { id: 0, name: 'No Clients Available', measures: [], csats: [] }
  ]);

  const [measures, setMeasures] = useState([]);

  const [measuresGoal, setMeasuresGoal] = useState({
    targetMeasures: 10,
    targetDate: '2020-04-20'
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
    months: ['June', 'July', 'August', 'September', 'October', 'November'],
    values: [0, 0, 0, 0, 0, 0]
  });

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
        <Header />
        <Switch>
          <Route path="/admin">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </StateContext.Provider>
  );
}
