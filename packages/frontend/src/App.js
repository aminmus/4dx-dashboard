import React, { useState, useEffect } from 'react';
import {
  // eslint-disable-next-line indent
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import fetchData from './fetchData';
import reformatClientData from './reformatClientData';
import calcDefineClients from './calcDefineClients';
import calcLeads from './calcLeads';
import reformatNps from './reformatNps';
import StateContext from './context/state-context';
import Home from './layout/Home';
import logo from './logo.png';
import Login from './layout/Login';

export default function App() {
  const [clients, setClients] = useState([
    { id: 0, name: 'No Clients Available', measures: [], csats: [] }
  ]);

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
  const [chart] = useState({
    months: ['June', 'July', 'August', 'September', 'October', 'November'],
    values: [-5, -43, -34, -49, -25, -19]
  });

  useEffect(async () => {
    const [npsData, clientsData] = await fetchData();

    if (clientsData.clients.data.length > 0) {
      const clientData = reformatClientData(clientsData.clients);
      setClients(clientData);
      setDefinedStatus(calcDefineClients(clientData));
      setLeadStatus(calcLeads(clientData));
    }
    if (npsData.nps.data.length) {
      setNps(reformatNps(npsData.nps));
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
        clients,
        nps,
        chart,
        leadStatus,
        definedStatus
      }}
    >
      <Router>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light py-0">
            <img className="logo navbar-brand" src={logo} alt="" />
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <div className="nav-link">
                    <Link className="text-light" style={{ textDecoration: 'none' }} to="/">
                      Home
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link" href="#">
                    <Link className="text-light" style={{ textDecoration: 'none' }} to="/admin">
                      Admin
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route path="/admin">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </header>
      </Router>
    </StateContext.Provider>
  );
}
