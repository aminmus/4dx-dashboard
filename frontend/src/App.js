import React, { useState } from 'react';
import {
  // eslint-disable-next-line indent
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import StateContext from './context/state-context';
import Home from './layout/Home';
import Admin from './layout/Admin';
import logo from './logo.png';

export default function App() {
  const [data] = useState({
    clients: [
      {
        id: 0,
        name: 'Arvid Nordqvist',
        progress: '3/10',
      },
      {
        id: 1,
        name: 'Bauhaus1',
        progress: '0/10',
      },
      {
        id: 2,
        name: 'Björn Borg',
        progress: '3/10',
      },
      {
        id: 3,
        name: 'Dr Denim',
        progress: '5/10',
      },
      {
        id: 4,
        name: 'Elon',
        progress: '7/10',
      },
      {
        id: 5,
        name: 'Engelsson',
        progress: '9/10',
      },
      {
        id: 6,
        name: 'Hydroscand',
        progress: '10/10',
      },
      {
        id: 7,
        name: 'Lantmännen',
        progress: '8/10',
      },
      {
        id: 8,
        name: 'Sc Motors',
        progress: '6/10',
      },
      {
        id: 9,
        name: 'Stiga Sports',
        progress: '5/10',
      },
    ],
    nps: {
      description: 'From -42 NPS to 10 by the end of October 2019',
      current: '-18',
      goal: '8',
      defineClients: '5',
      defineText: 'Define the Success factors for top 10 clients',
      implementText: 'Implement Client Success Program for top 10 clients',
    },
    chart: {
      months: ['June', 'July', 'August', 'September', 'October', 'November'],
      values: [-5, -43, -34, -49, -25, -19],
    },
  });

  return (
    <StateContext.Provider
      value={{
        clients: data.clients,
        nps: data.nps,
        chart: data.chart,
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
              <Admin />
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
