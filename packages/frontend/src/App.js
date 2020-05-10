/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { ThemeProvider } from '@material-ui/core';
import Header from './layouts/Header';
import Admin from './layouts/Admin';
import isAuthenticated from './utils/authentication';
import { setLogoutStatus, setLoginStatus } from './actions/auth';
import customRoutes from './customRoutes';
import { disableEdit } from './actions/editMode';
import theme from './style/muiTheme';

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
      dispatch(disableEdit());
    }
  }, []);

  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Header />
        <Admin history={history} customRoutes={customRoutes} />
      </ThemeProvider>
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(App);
