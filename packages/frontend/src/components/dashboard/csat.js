/* eslint-disable camelcase, import/no-extraneous-dependencies, react/destructuring-assignment, react/jsx-props-no-spreading, react/prop-types */

import React from 'react';
import {
  required,
  minValue,
  maxValue,
  number,
  regex,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput
} from 'react-admin';

import { parse } from 'query-string';

const validateScore = [required(), number(), minValue(1), maxValue(10)];
const validateDate = [
  required(),
  regex(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/, 'Must be a valid date')
];

export const CsatEdit = props => {
  const { client_id } = parse(props.location.search);
  return (
    <Edit title="Edit Client Satisfaction score" {...props}>
      <SimpleForm redirect={`/clients/${client_id}/show/csat`}>
        <TextInput disabled source="id" />
        <DateInput source="date" validate={validateDate} />
        <NumberInput source="score" validate={validateScore} />
      </SimpleForm>
    </Edit>
  );
};

export const CsatCreate = props => {
  const { client_id } = parse(props.location.search);
  return (
    <Create title="Create Client Satisfaction score" {...props}>
      <SimpleForm
        defaultValue={{ ClientId: client_id }}
        redirect={`/clients/${client_id}/show/csat`}
      >
        <NumberInput source="ClientId" disabled />
        <DateInput source="date" validate={validateDate} />
        <NumberInput source="score" validate={validateScore} />
      </SimpleForm>
    </Create>
  );
};
