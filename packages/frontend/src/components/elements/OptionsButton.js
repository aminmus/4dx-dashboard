import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import COLORS from '../../style/COLORS';

/**
 * Stylised Button Component
 *
 * @component
 * @param {Object} props
 */
const OptionsButton = ({ text, onClick, type }) => {
  const { primary, secondary, dark } = COLORS;

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
    <OptButton color="default" size="small" variant="contained" onClick={onClick} type={type}>
      {text}
    </OptButton>
  );
};

OptionsButton.defaultProps = {
  text: '',
  type: null,
  onClick: undefined
};

OptionsButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string
};

export default OptionsButton;
