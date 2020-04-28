/* eslint-disable react/destructuring-assignment, react/jsx-props-no-spreading */
import React from 'react';
import { Sidebar } from 'react-admin';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

/**
 * Custom Sidebar to pass into React Admin
 * @component
 * @param {object} props
 */
const CustomSidebar = props => {
  return props.isLoggedIn ? <Sidebar {...props} /> : null;
};

CustomSidebar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled,
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps, null)(CustomSidebar);
