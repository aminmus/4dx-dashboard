import React from 'react';
import { Notification, LoginForm } from 'react-admin';
import { ThemeProvider, Card, Avatar, makeStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import muiTheme from '../style/muiTheme';

/**
 * Custom Login Page Component
 * To use our custom theme and control redirect after login
 * @component
 */
const Login = () => {
  // Base styles copied from default standard react admin login page
  const useStyles = makeStyles(
    theme => ({
      main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '1px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage:
          'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)'
      },
      card: {
        minWidth: 300,
        marginTop: '6em'
      },
      avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center'
      },
      icon: {
        backgroundColor: theme.palette.secondary[500]
      }
    }),
    { name: 'RaLogin' }
  );

  const classes = useStyles();

  return (
    <ThemeProvider theme={muiTheme}>
      <Card className={classes.card}>
        <div className={classes.avatar}>
          <Avatar className={classes.icon}>
            <LockIcon />
          </Avatar>
        </div>
        <LoginForm redirectTo="/" />
      </Card>

      <Notification />
    </ThemeProvider>
  );
};

export default Login;
