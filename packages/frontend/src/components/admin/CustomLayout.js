/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Notification, Sidebar, setSidebarVisibility } from 'react-admin';
import { push } from 'connected-react-router';
import authProvider from '../../utils/react-admin/authProvider';
import CustomMenu from './CustomMenu';
import { toggleEdit } from '../../slices/editMode';
import COLORS from '../../style/COLORS';

const { darkGray } = COLORS;

/**
 * Custom Layout component to pass into React Admin
 * @param {object} props
 * @param {(Function|Node)} props.children
 * @param {Boolean} props.isLoggedIn
 * @param {Function} props.dispatch
 */
const CustomLayout = ({ children, isLoggedIn, dispatch, editMode }) => {
  const { logout } = authProvider;
  const useStyles = makeStyles(theme => ({
    root: {
      zIndex: 1,
      minHeight: '100vh',
      position: 'relative'
    },
    appFrame: {
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'auto',
      minWidth: 0
    },
    contentWithSidebar: {
      display: 'flex',
      flexGrow: 1
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 2,
      minWidth: 0,
      padding: theme.spacing(2)
    },
    sidebar: {
      backgroundColor: darkGray
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    dispatch(setSidebarVisibility(false));
  }, [setSidebarVisibility]);

  const handleEditClick = e => {
    e.preventDefault();
    dispatch(toggleEdit());
    dispatch(push('/'));
  };

  const handleLogoutClick = e => {
    e.preventDefault();
    logout();
    dispatch(push('/'));
  };

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <main className={classes.contentWithSidebar}>
          {isLoggedIn && (
            <Sidebar className={classes.sidebar}>
              <CustomMenu
                handleEditClick={handleEditClick}
                handleLogoutClick={handleLogoutClick}
                editMode={editMode}
              />
            </Sidebar>
          )}
          <div className={classes.content}>{children}</div>
        </main>
        <Notification />
      </div>
    </div>
  );
};

CustomLayout.defaultProps = {
  children: null
};

CustomLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth, editMode }) => ({
  isLoggedIn: auth?.isLoggedIn,
  editMode: editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(CustomLayout);
