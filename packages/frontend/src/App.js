/* eslint-disable no-console, import/no-cycle */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from './components/Header';
import Home from './layouts/Home';
import Admin from './layouts/Admin';
import isAuthenticated from './utils/authentication';
import { setLogoutStatus, setLoginStatus } from './actions/auth';

const App = ({ history, dispatch }) => {
  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(setLoginStatus());
    } else {
      dispatch(setLogoutStatus());
    }
  }, []);

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
  history: ReactRouterPropTypes.history.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(App);
