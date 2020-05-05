import React from 'react';
import PropTypes from 'prop-types';
import { Slide, useScrollTrigger } from '@material-ui/core';

/**
 * HideOnScroll Component
 *
 * Will hide its children components on scroll
 * @component
 * @prop {boolean} children - child components
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
  children: PropTypes.element.isRequired
};

export default HideOnScroll;
