/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { Notification, LoginForm, useCheckAuth } from 'react-admin';
import { useHistory } from 'react-router-dom';
import { Card, Avatar, makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import LockIcon from '@material-ui/icons/Lock';

/**
 * Custom Login Page Component
 * To use our custom theme and control redirect after login
 * Based on the default Login Page component provided by React Admin
 * @component
 */
const Login = props => {
  // Base styles copied from default standard react admin login page
  const useStyles = makeStyles(
    theme => ({
      main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '0.1em',
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
        margin: '0.2em',
        display: 'flex',
        justifyContent: 'center'
      },
      icon: {
        backgroundColor: theme.palette.secondary[500]
      }
    }),
    { name: 'RaLogin' }
  );
  const {
    // theme,
    // classes: classesOverride,
    className,
    // children,
    // staticContext,
    backgroundImage,
    ...rest
  } = props;
  const containerRef = useRef();
  const classes = useStyles(props);
  let backgroundImageLoaded = false;
  const checkAuth = useCheckAuth();
  const history = useHistory();
  useEffect(() => {
    checkAuth({}, false)
      .then(() => {
        // already authenticated, redirect to the home page
        history.push('/');
      })
      .catch(() => {
        // not authenticated, stay on the login page
      });
  }, [checkAuth, history]);

  const updateBackgroundImage = () => {
    if (!backgroundImageLoaded && containerRef.current) {
      containerRef.current.style.backgroundImage = `url(${backgroundImage})`;
      backgroundImageLoaded = true;
    }
  };

  // Load background image asynchronously to speed up time to interactive
  const lazyLoadBackgroundImage = () => {
    if (backgroundImage) {
      const img = new Image();
      img.onload = updateBackgroundImage;
      img.src = backgroundImage;
    }
  };

  useEffect(() => {
    if (!backgroundImageLoaded) {
      lazyLoadBackgroundImage();
    }
  });

  return (
    <div className={classnames(classes.main, className)} {...rest} ref={containerRef}>
      <Card className={classes.card}>
        <div className={classes.avatar}>
          <Avatar className={classes.icon}>
            <LockIcon />
          </Avatar>
        </div>
        <LoginForm redirectTo="/" />
      </Card>

      <Notification />
    </div>
  );
};

export default Login;
