/* eslint-disable import/no-cycle */
import React from 'react';
import { makeStyles, AppBar, Toolbar, Button, IconButton, Popover } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HttpsIcon from '@material-ui/icons/Https';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { setSidebarVisibility } from 'react-admin';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import logo from '../../logo.png';
import authProvider from '../../utils/react-admin/authProvider';
import COLORS from '../../style/COLORS';
import HideOnScroll from '../elements/HideOnScroll';

const { darkGray } = COLORS;

/**
 * Header Component
 * @component
 * @prop {boolean} isLoggedIn - Check if user is logged in
 * @prop {function} dispatch - Redux Dispatch
 */
const Header = ({ isLoggedIn, dispatch }) => {
  const { logout } = authProvider;
  const matches = useMediaQuery('(min-width:600px)');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? 'simple-popover' : undefined;

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

  const handleLogoClick = e => {
    e.preventDefault();
    dispatch(push('/'));
  };

  const isSidebarOpen = useSelector(state => state.admin.ui.sidebarOpen);

  /**
   * Component Styles
   */
  const useStyles = makeStyles({
    navbarCollapse: {
      justifyContent: 'flex-end',
      width: '100%',
      '& .navbar-nav': {
        padding: '0.2em'
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
    logoContainer: {
      '&:hover': {
        cursor: 'pointer'
      },
      '& img': {
        height: matches ? '105px' : '60px'
      }
    },
    toolbar: {
      justifyContent: 'space-between'
    },
    poplistContainer: {
      alignSelf: 'center',
      margin: '0 0.3em',
      padding: '0 0.3em'
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
          <div
            className={classes.logoContainer}
            tabIndex="0"
            onClick={handleLogoClick}
            onKeyPress={handleLogoClick}
            role="link"
            alt="home"
          >
            <img className={classes.logo} src={logo} alt="logo" />
          </div>
          <div>
            <IconButton
              aria-describedby={id}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              {isLoggedIn ? (
                <>
                  <Button edge="start" aria-label="login" onClick={handleLogoutClick}>
                    <div className={classes.poplistContainer}>Logout</div>
                    <ExitToAppIcon />
                  </Button>
                </>
              ) : (
                <>
                  <Button edge="start" aria-label="logout" onClick={handleLoginClick}>
                    <div className={classes.poplistContainer}>
                      <span>Login</span>
                    </div>
                    <HttpsIcon />
                  </Button>
                </>
              )}
            </Popover>
          </div>
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
