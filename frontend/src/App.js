import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StateContext from './context/state-context';
import Home from './layout/Home';
import Admin from './layout/Admin';
import logo from './logo.png';

export default class App extends Component {
  state = {
    "clients": [
      {
        "name": "Arvid Nordqvist",
        "progress": "3/10"
      },
      {
        "name": "Bauhaus1",
        "progress": "0/10"
      },
      {
        "name": "Björn Borg",
        "progress": "3/10"
      },
      {
        "name": "Dr Denim",
        "progress": "5/10"
      },
      {
        "name": "Elon",
        "progress": "7/10"
      },
      {
        "name": "Engelsson",
        "progress": "9/10"
      },
      {
        "name": "Hydroscand",
        "progress": "10/10"
      },
      {
        "name": "Lantmännen",
        "progress": "8/10"
      },
      {
        "name": "Sc Motors",
        "progress": "6/10"
      },
      {
        "name": "Stiga Sports",
        "progress": "5/10"
      }
    ],
    "nps":
    {
      "description": "From -42 NPS to 10 by the end of October 2019",
      "current": "-18",
      "goal": "8",
      "defineClients": "5",
      "defineText": "Define the Success factors for top 10 clients",
      "implementText": "Implement Client Success Program for top 10 clients"
    },
    "chart":
    {
      "months": ["June", "July", "August", "September", "October", "November"],
      "values": [-5, -43, -34, -49, -25, -19]
    }
  }
  render() {
    return (
      <StateContext.Provider
        value={{
          clients: this.state.clients,
          nps: this.state.nps,
          chart: this.state.chart
        }}
      >
        <Router>
          <header>
            <nav className="navbar navbar-expand-lg navbar-light py-0">
              <a className="navbar-brand" href="#">
                <img className="logo" src={logo} alt="" />
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

                  <li className="nav-item">
                    <a className="nav-link" href="#"><Link className="text-light" style={{ textDecoration: 'none' }} to="/">Home</Link></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><Link className="text-light" style={{ textDecoration: 'none' }} to="/admin">Admin</Link></a>
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
}
