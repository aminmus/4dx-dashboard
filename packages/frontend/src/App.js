/* eslint-disable no-console, import/no-cycle */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from './components/Header';
import Home from './layouts/Home';
import Admin from './layouts/Admin';

const App = ({ history }) => {
  return (
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
  );
};

App.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

export default connect(null, null)(App);
