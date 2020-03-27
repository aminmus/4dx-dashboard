import React from 'react';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import COLORS from '../../style/COLORS';

const OptionsToggleButton = props => {
  const { primary, secondary, light } = COLORS;
  const { onClick } = props;

  const OptToggleButton = withStyles({
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
  })(DehazeIcon);

  return (
    <div>
      <OptToggleButton onClick={onClick} aria-label="options" style={{ marginLeft: '10px' }}>
        <OptionsToggleIcon />
      </OptToggleButton>
    </div>
  );
};

OptionsToggleButton.defaultProps = {};

OptionsToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default OptionsToggleButton;
