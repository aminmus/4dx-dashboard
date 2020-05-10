/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles, AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { setSidebarVisibility } from 'react-admin';
import logo from '../logo.png';
import authProvider from '../utils/react-admin/authProvider';
import COLORS from '../style/COLORS';
import HideOnScroll from '../components/HideOnScroll';

/**
 * Header Component
 * @component
 * @prop {boolean} isLoggedIn - Check if user is logged in
 * @prop {function} dispatch - Redux Dispatch
 */
const Header = ({ isLoggedIn, dispatch }) => {
  const { darkGray } = COLORS;
  const { logout } = authProvider;

  /**
   * Logs out user and pushes them to the frontpage
   * @param e - Event Object
   */
  const handleLogoutClick = e => {
    e.preventDefault();
    logout();
    dispatch(push('/'));
  };

  const handleLoginClick = e => {
    e.preventDefault();
    dispatch(push('/login'));
  };

  const isSidebarOpen = useSelector(state => state.admin.ui.sidebarOpen);

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    navbarCollapse: {
      justifyContent: 'space-between',
      width: '100%',
      '& .navbar-nav': {
        padding: '10px'
      }
    },
    header: {
      top: 0,
      position: 'sticky',
      // Slightly lower than sidebar zIndex
      zIndex: 1000,
      backgroundColor: darkGray,
      padding: '0 1vw'
    },
    logo: {
      height: '105px'
    },
    toolbar: {
      justifyContent: 'space-between'
    }
  });

  const classes = useStyles();

  return (
    <HideOnScroll>
      <AppBar className={classes.header} expand="lg">
        <Toolbar className={classes.toolbar}>
          {isLoggedIn && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={
                isSidebarOpen
                  ? () => dispatch(setSidebarVisibility(false))
                  : () => dispatch(setSidebarVisibility(true))
              }
            >
              <MenuIcon />
            </IconButton>
          )}
          <img className={classes.logo} src={logo} alt="logo" />
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth?.isLoggedIn
});

export default connect(mapStateToProps, null)(Header);
