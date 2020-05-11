/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DateField as DefaultDateField } from 'react-admin';

/**
 * Custom DateField component for react-admin.
 * Used to set locale prop to swedish for showing a swedish date format
 * @component
 * @param {Object} props
 */
const DateField = props => <DefaultDateField {...props} locales="sv-SE" />;

export default DateField;
