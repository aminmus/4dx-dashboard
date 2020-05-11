/* eslint-disable camelcase, react/destructuring-assignment, react/jsx-props-no-spreading, react/prop-types */

import React from 'react';
import { Edit, Create, SimpleForm, NumberInput } from 'react-admin';
import { parse } from 'query-string';
import { validateScore, validateDateRequired } from '../../utils/react-admin/adminValidation';
import { DateInput } from './DateInput';

export const CsatEdit = props => {
  const { client_id } = parse(props.location.search);
  return (
    <Edit title="Edit Client Satisfaction score" {...props}>
      <SimpleForm redirect={`/clients/${client_id}/show/csat`}>
        <NumberInput source="score" validate={validateScore} />
        <DateInput source="date" validate={validateDateRequired} />
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
        <NumberInput source="score" validate={validateScore} />
        <DateInput source="date" validate={validateDateRequired} />
      </SimpleForm>
    </Create>
  );
};
