/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from './components/Header';
import Home from './layouts/Home';
import Admin from './layouts/Admin';
import Login from './layouts/Login';
import isAuthenticated from './utils/authentication';
import { setLogoutStatus, setLoginStatus } from './actions/auth';

/**
 * Main App Component
 * @component
 * @prop {object} history - History Object
 * @prop {function} dispatch - Redux Dispatch
 */

const App = ({ history, dispatch }) => {
  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(setLoginStatus());
    } else {
      dispatch(setLogoutStatus());
    }
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Header />
      <Switch>
        <Route path="/admin">
          <Admin history={history} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(App);
