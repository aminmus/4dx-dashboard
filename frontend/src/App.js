import React, { useState, useEffect } from 'react';
import {
  // eslint-disable-next-line indent
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import StateContext from './context/state-context';
import Home from './layout/Home';
import logo from './logo.png';
import Login from './layout/Login';

export default function App() {
  const [clients, setClients] = useState([{ id: 0, name: 'default', progress: '0/10' }]);
  const [nps, setNps] = useState({
    description: 'N/A',
    current: '0',
    goal: '0',
    defineClients: '0',
    defineText: 'N/A',
    implementText: 'N/A'
  });
  const [chart, setChart] = useState({
    months: ['June', 'July', 'August', 'September', 'October', 'November'],
    values: [-5, -43, -34, -49, -25, -19]
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/clients')
      .then(response => response.json())
      .then(clients => setClients(clients))
      .then(console.log(clients));
    fetch('http://localhost:4000/api/nps')
      .then(response => response.json())
      .then(nps => setNps(nps))
      .then(console.log(nps));
  }, []);

  return (
    <StateContext.Provider
      value={{
        clients: clients,
        nps: nps,
        chart: chart
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
