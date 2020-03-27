import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import COLORS from '../../style/COLORS';

const OptionsButton = props => {
  const { primary, secondary, dark } = COLORS;
  const { text, onClick } = props;

  const OptButton = withStyles({
    label: {
      color: dark
    },
    root: {
      backgroundColor: primary,
      margin: '10px',
      '&:hover': {
        backgroundColor: secondary,
        boxShadow: 'none'
      }
    }
  })(Button);

  return (
    <OptButton color="default" size="small" variant="contained" onClick={onClick}>
      {text}
    </OptButton>
  );
};

OptionsButton.defaultProps = {
  text: ''
};

OptionsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string
};

export default OptionsButton;
