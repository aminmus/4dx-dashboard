import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { useNotify, Notification } from 'react-admin';
import { ThemeProvider, Button } from '@material-ui/core';
// eslint-disable-next-line import/no-cycle
import authProvider from '../utils/react-admin/authProvider';
import theme from '../style/muiTheme';

/**
 * Custom Login Page Component
 * @component
 */
const Login = ({ dispatch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const notify = useNotify();
  const submit = async e => {
    e.preventDefault();
    try {
      await authProvider.login({ username: email, password });
      dispatch(push('/'));
    } catch (error) {
      notify('Invalid email or password', 'warning');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </label>
        </div>
        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <Button type="submit">Sign in</Button>
      </form>
      <Notification />
    </ThemeProvider>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(null, null)(Login);
