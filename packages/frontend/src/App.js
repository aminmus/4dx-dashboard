/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import Header from './components/layout/Header';
import Admin from './components/layout/Admin';
import isAuthenticated from './utils/authentication';
import { setLogoutStatus, setLoginStatus } from './slices/auth';
import customRoutes from './customRoutes';
import { disableEdit } from './slices/editMode';
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
        <CssBaseline />
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
