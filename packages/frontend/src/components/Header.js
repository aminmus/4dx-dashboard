/* eslint-disable import/no-cycle */
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../logo.png';
import authProvider from '../utils/react-admin/authProvider';

/**
 * Header Component
 * @component
 * @prop {boolean} isLoggedIn - Check if user is logged in
 * @prop {function} dispatch - Redux Dispatch
 */

const Header = ({ isLoggedIn, dispatch }) => {
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
   * Navbar Collapse Style
   * @type {object}
   */
  const NavbarCollapseStyle = {
    justifyContent: 'space-between',
    width: '100%'
  };

  /**
   * Header Style
   * @type {object}
   */
  const HeaderStyle = {
    backgroundColor: '#333333'
  };

  /**
   * Logo Style
   * @type {object}
   */
  const LogoStyle = {
    height: '105px'
  };

  return (
    <header style={HeaderStyle}>
      <Navbar className="py-0" expand="lg" variant="dark">
        <Navbar.Brand href="/">
          <img style={LogoStyle} className="logo navbar-brand" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={NavbarCollapseStyle} id="navbar-nav">
          <Nav className="navbar-nav-left">
            <Link className="nav-link text-light" style={{ textDecoration: 'none' }} to="/">
              Home
            </Link>
            <Link className="nav-link text-light" style={{ textDecoration: 'none' }} to="/admin">
              Admin
            </Link>
          </Nav>
          <Nav className="navbar-nav-right">
            {isLoggedIn ? (
              <Nav.Item
                className="nav-link btn-logout text-light"
                style={{ textDecoration: 'none' }}
                onClick={handleLogoutClick}
              >
                Logout
              </Nav.Item>
            ) : (
              <Nav.Item
                className="nav-link btn-login text-light"
                style={{ textDecoration: 'none' }}
                onClick={handleLoginClick}
              >
                Sign in
              </Nav.Item>
            )}
          </Nav>
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
