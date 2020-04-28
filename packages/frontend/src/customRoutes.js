import React from 'react';
import { Route } from 'react-router-dom';
import Home from './layouts/Home';

const customRoutes = [<Route exact path="/" component={Home} />];

export default customRoutes;
