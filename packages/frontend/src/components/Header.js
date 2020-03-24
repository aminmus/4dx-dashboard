import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import logo from '../logo.png';
import authProvider from './utils/authProvider';

export default function Header() {
  const { logout } = authProvider;
  const history = useHistory();

  const isLoggedIn = () => {
    return localStorage.getItem('token');
  };

  const handleClick = e => {
    e.preventDefault();
    logout();
    history.push('/');
  };

  return (
    <header>
      <Navbar className="py-0" expand="lg" variant="dark">
        <Navbar.Brand href="/">
          <img className="logo navbar-brand" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="navbar-nav-left">
            <Link className="nav-link text-light" style={{ textDecoration: 'none' }} to="/">
              Home
            </Link>
            <Link className="nav-link text-light" style={{ textDecoration: 'none' }} to="/admin">
              Admin
            </Link>
          </Nav>
          <Nav className="navbar-nav-right">
            {isLoggedIn() ? (
              <Nav.Item
                className="nav-link btn-logout text-light"
                style={{ textDecoration: 'none' }}
                onClick={handleClick}
              >
                Logout
              </Nav.Item>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
