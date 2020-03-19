/* eslint-disable no-console, no-unused-vars */
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

export default function App() {
  const [clients, setClients] = useState([
    { id: 0, name: 'No Clients Available', measures: [], csats: [] }
  ]);

  // TODO: TRIM DOWN AND FETCH DATA IN USEFFECT
  const [measures, setMeasures] = useState([
    '2020-03-03',
    '2020-01-01',
    '2020-04-04',
    '2020-05-05',
    '2020-01-01',
    '2020-02-02',
    '2020-03-03',
    '2020-03-03',
    '2020-05-05',
    '2020-05-05',
    null,
    null,
    null,
    null
  ]);

  /*
   TODO: REPLACE MOCK DATA (FOR TARGET DATE AND EXPECTED COMPLETED MEASURES BY SAID DATE)
   AND FETCH DATA IN USEFFECT 
   */
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
        const [npsData, clientsData] = await fetchData();
        if (clientsData.clients.data.length > 0) {
          const clientData = reformatClientData(clientsData.clients);
          setClients(clientData);
          setDefinedStatus(calcDefineClients(clientData));
          setLeadStatus(calcLeads(clientData));
        }
        if (npsData.nps.data.length) {
          setNps(reformatNps(npsData.nps));
          setChart(reformatChart(npsData.nps));
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
