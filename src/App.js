import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './layout/Home';
import Admin from './layout/Admin';
import logo from './logo.png';

export default function App() {
  return (
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
  );
}
