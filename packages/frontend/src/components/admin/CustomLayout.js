import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Notification, Sidebar, setSidebarVisibility } from 'react-admin';

const CustomLayout = ({ children, isLoggedIn, dispatch }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1,
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      position: 'relative'
    },
    appFrame: {
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'auto'
    },
    contentWithSidebar: {
      display: 'flex',
      flexGrow: 1
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 2,
      padding: theme.spacing(3),
      marginTop: '4em',
      paddingLeft: 5
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    dispatch(setSidebarVisibility(false));
  }, [setSidebarVisibility]);

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <main className={classes.contentWithSidebar}>
          {isLoggedIn && (
            <Sidebar>
              <Menu hasDashboard={false} />
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
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth?.isLoggedIn
});

export default connect(mapStateToProps, null)(CustomLayout);
