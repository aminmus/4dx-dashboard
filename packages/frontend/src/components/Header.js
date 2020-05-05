/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Navbar, Nav } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
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

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    navbarCollapse: {
      justifyContent: 'flex-end',
      width: '100%',
      '& .navbar-nav': {
        padding: '10px'
      }
    },
    header: {
      backgroundColor: darkGray
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
        <Navbar.Brand>
          <Link className={classes.navlink} to="/">
            <img className={classes.logo} src={logo} alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className={classes.navbarCollapse}>
          {isLoggedIn ? (
            <Nav.Item className={classes.navlink} onClick={handleLogoutClick}>
              <Typography variant="h5">Logout</Typography>
            </Nav.Item>
          ) : (
            <Nav.Item className={classes.navlink} onClick={handleLoginClick}>
              <Typography variant="h5">Sign in</Typography>
            </Nav.Item>
          )}
        </Navbar.Collapse>
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
