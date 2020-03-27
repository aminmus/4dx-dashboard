import React from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import COLORS from '../../style/COLORS';

const RefreshButton = props => {
  const { primary, secondary, light } = COLORS;
  const { onClick } = props;

  const RefreshBtn = withStyles({
    root: {
      color: primary,
      margin: '10px',
      '&:hover': {
        backgroundColor: secondary,
        boxShadow: 'none'
      },
      '&:focus': {
        outline: 'none'
      }
    }
  })(IconButton);

  const OptionsToggleIcon = withStyles({
    root: {
      color: primary,
      '&:hover': {
        color: light
      }
    }
  })(RefreshIcon);

  return (
    <RefreshBtn onClick={onClick} aria-label="options" style={{ marginLeft: '10px' }}>
      <OptionsToggleIcon />
    </RefreshBtn>
  );
};

RefreshButton.defaultProps = {};

RefreshButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RefreshButton;
