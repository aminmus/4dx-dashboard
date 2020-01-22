import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './layout/Home';
import Admin from './layout/Admin';
import logo from './logo.png';

export default function App() {
  return (
    <Router>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          <a class="navbar-brand" href="#">
            <img src={logo} height="105" alt="" />
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">

              <li class="nav-item">
                <a class="nav-link" href="#"><Link className="text-light" style={{ textDecoration: 'none' }} to="/">Home</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><Link className="text-light" style={{ textDecoration: 'none' }} to="/admin">Admin</Link></a>
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
      </div>
    </Router>
  );
}
