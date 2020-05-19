import React from 'react';
import { useSelector } from 'react-redux';
import { MenuItemLink } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import DefaultIcon from '@material-ui/icons/ViewList';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

/**
 * Custom Menu component for SideBar
 * @param {object} props Component props
 * @param {Function} props.onMenuClick Handle event for menu item click
 * @param {Function} props.handleEditClick Handle event for edit item click
 * @param {Function} props.handleLogoutClick Handle event for logout item click
 * @param {Boolean} editMode Is user in Edit Mode
 */
const CustomMenu = ({ handleEditClick, handleLogoutClick, editMode }) => {
  const useStyles = makeStyles({
    containerHeight: {
      height: '100vh'
    }
  });
  const open = useSelector(state => state.admin.ui.sidebarOpen);

  const classes = useStyles();

  return (
    <div className={classes.containerHeight}>
      <MenuItemLink
        to="/"
        key="home"
        primaryText="Home"
        leftIcon={<HomeIcon />}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to="/"
        key="editMode"
        primaryText={editMode ? 'Turn Off Edit Mode' : 'Edit Mode'}
        onClick={handleEditClick}
        leftIcon={<EditIcon />}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to="/nps"
        key="nps"
        primaryText="NPS"
        leftIcon={<DefaultIcon />}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to="/clients"
        key="clients"
        primaryText="Clients"
        leftIcon={<DefaultIcon />}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to="/users"
        key="users"
        primaryText="Users"
        leftIcon={<DefaultIcon />}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to="/measureGoals"
        key="measureGoals"
        primaryText="Measure Goals"
        leftIcon={<DefaultIcon />}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to="/"
        key="logout"
        primaryText="Logout"
        onClick={handleLogoutClick}
        leftIcon={<ExitToAppIcon />}
        sidebarIsOpen={open}
      />
    </div>
  );
};

CustomMenu.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  handleLogoutClick: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired
};

export default withRouter(CustomMenu);
