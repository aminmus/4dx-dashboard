/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from './components/Header';
import Admin from './layouts/Admin';
import isAuthenticated from './utils/authentication';
import { setLogoutStatus, setLoginStatus } from './actions/auth';
import customRoutes from './customRoutes';

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
      <Admin history={history} customRoutes={customRoutes} />
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(App);
