import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import logo from '../logo.png';

import logout from '../authProvider';

export default function Header() {
  const history = useHistory();

  const handleClick = e => {
    e.preventDefault();
    logout.logout();
    history.push('/');
  };
  return (
    <header>
      <Navbar className="py-0" expand="lg" variant="dark">
        <Navbar.Brand href="/">
          <img className="logo navbar-brand" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="text-light mx-2" style={{ textDecoration: 'none' }} to="/">
              Home
            </Link>
            <Link className="text-light mx-2" style={{ textDecoration: 'none' }} to="/admin">
              Admin
            </Link>
            <Nav.Item
              className="text-light mx-2"
              style={{ textDecoration: 'none' }}
              onClick={handleClick}
            >
              Logout
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
