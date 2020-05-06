import React from 'react';
import PropTypes from 'prop-types';
import { Slide, useScrollTrigger } from '@material-ui/core';

/**
 * HideOnScroll Component
 *
 * Will hide its children components on scroll
 * @component
 * @prop {(Function|Node)} children - child components
 */
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired
};

export default HideOnScroll;
