import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/layout/Home';

/**
 * All routes that are not part of react-admin.
 * Used to pass into react-admin so that they are used in react-admin's router
 * @const
 * @type Array
 */
const customRoutes = [<Route exact path="/" component={Home} />];

export default customRoutes;
