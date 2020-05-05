/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Navbar, Nav } from 'react-bootstrap';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { setSidebarVisibility } from 'react-admin';
import logo from '../logo.png';
import authProvider from '../utils/react-admin/authProvider';
import COLORS from '../style/COLORS';

/**
 * Header Component
 * @component
 * @prop {boolean} isLoggedIn - Check if user is logged in
 * @prop {function} dispatch - Redux Dispatch
 */

const Header = ({ isLoggedIn, dispatch }) => {
  const { darkGray, light, gray } = COLORS;
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
    navlink: {
      fontSize: '1.2em',
      color: light,
      '&:hover': {
        color: gray,
        textDecoration: 'none',
        cursor: 'pointer'
      }
    }
  });

  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Navbar expand="lg" variant="dark">
        {isLoggedIn && (
          <Navbar.Toggle
            onClick={
              isSidebarOpen
                ? () => dispatch(setSidebarVisibility(false))
                : () => dispatch(setSidebarVisibility(true))
            }
            aria-controls="basic-navbar-nav"
          />
        )}
        <Navbar.Brand href="/">
          <img className={classes.logo} src={logo} alt="logo" />
        </Navbar.Brand>
        <Nav>
          {isLoggedIn ? (
            <Nav.Item className={classes.navlink} onClick={handleLogoutClick}>
              Logout
            </Nav.Item>
          ) : (
            <Nav.Item className={classes.navlink} onClick={handleLoginClick}>
              Sign in
            </Nav.Item>
          )}
        </Nav>
      </Navbar>
    </header>
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
