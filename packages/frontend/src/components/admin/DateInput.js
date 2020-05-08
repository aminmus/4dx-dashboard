/* eslint-disable react/forbid-prop-types, react/jsx-props-no-spreading */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useInput, FieldTitle } from 'react-admin';
import {
  KeyboardDatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

/**
 * Wrapper component for react admin to wrap Material UI Pickers, so they work with react-admin specifics.
 * Inspired by: https://github.com/vascofg/react-admin-date-inputs
 *
 * @component
 * @param {Object} props
 */
const Picker = ({ PickerComponent, ...fieldProps }) => {
  const { options, label, source, resource, className, isRequired, locale } = fieldProps;

  const { input, meta } = useInput({ source });

  const { touched, error } = meta;

  const handleChange = useCallback(value => {
    // eslint-disable-next-line no-unused-expressions
    Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
  }, []);

  return (
    <div className="picker">
      <MuiPickersUtilsProvider {...{ utils: MomentUtils, locale }}>
        <PickerComponent
          {...options}
          format="YYYY-MM-DD"
          label={
            <FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />
          }
          margin="normal"
          error={!!(touched && error)}
          helperText={touched && error}
          className={className}
          value={input.value ? new Date(input.value) : null}
          onChange={date => handleChange(date)}
          onBlur={() => input.onBlur(input.value ? new Date(input.value).toISOString() : null)}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

Picker.propTypes = {
  PickerComponent: PropTypes.element.isRequired,
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
  labelTime: PropTypes.string,
  className: PropTypes.string,
  locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

Picker.defaultProps = {
  input: {},
  isRequired: false,
  meta: { touched: false, error: false },
  options: {},
  resource: '',
  source: '',
  labelTime: '',
  className: '',
  locale: undefined
};

export const DateInput = props => <Picker PickerComponent={KeyboardDatePicker} {...props} />;
export const TimeInput = props => <Picker PickerComponent={TimePicker} {...props} />;
export const DateTimeInput = props => <Picker PickerComponent={DateTimePicker} {...props} />;
