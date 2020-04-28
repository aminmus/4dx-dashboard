/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar';
import Sidebar from './Sidebar';

/**
 * Custom Layout component to pass into React Admin
 * @param {object} props
 */
const CustomLayout = props => <Layout {...props} appBar={CustomAppBar} sidebar={Sidebar} />;

export default CustomLayout;
