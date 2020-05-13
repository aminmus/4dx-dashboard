import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import COLORS from '../../style/COLORS';

/**
 * Stylised Button Component
 *
 * @component
 * @param {Object} props Component props
 * @param {Boolean} props.disabled Is button disabled
 * @param {string} props.text Button text
 * @param {Function} props.onClick On click event handler
 * @param {string} props.type Button type
 */
const OptionsButton = ({ disabled, text, onClick, type }) => {
  const { primary, secondary, dark } = COLORS;

  const OptButton = withStyles({
    label: {
      color: dark
    },
    root: {
      backgroundColor: primary,
      margin: '0.2em',
      '&:hover': {
        backgroundColor: secondary,
        boxShadow: 'none'
      }
    }
  })(Button);

  return (
    <OptButton
      disabled={disabled}
      color="default"
      size="small"
      variant="contained"
      onClick={onClick}
      type={type}
    >
      {text}
    </OptButton>
  );
};

OptionsButton.defaultProps = {
  disabled: false,
  text: '',
  type: null,
  onClick: undefined
};

OptionsButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string
};

export default OptionsButton;
