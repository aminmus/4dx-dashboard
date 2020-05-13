/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Picker from './Picker';

/**
 * Custom react admin date input component using Material UI KeyboardDatePicker
 * @component
 * @param {Object} props
 */
const DateInput = props => <Picker PickerComponent={KeyboardDatePicker} {...props} />;

export default DateInput;
