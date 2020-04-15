/* eslint-disable camelcase, react/destructuring-assignment, react/jsx-props-no-spreading, react/prop-types */

import React from 'react';
import { Edit, Create, SimpleForm, TextInput, DateInput } from 'react-admin';
import { parse } from 'query-string';
import { validateDescription, validateDate } from '../../utils/react-admin/adminValidation';

export const MeasureEdit = props => {
  const { client_id } = parse(props.location.search);
  return (
    <Edit title="Edit Client Measure" {...props}>
      <SimpleForm redirect={`/clients/${client_id}/show/measures`}>
        <TextInput disabled source="id" />
        <TextInput source="description" validate={validateDescription} />
        <DateInput
          source="success"
          label="Success Date"
          validate={validateDate}
          className="mx-auto"
        />
      </SimpleForm>
    </Edit>
  );
};

export const MeasureCreate = props => {
  const { client_id } = parse(props.location.search);
  return (
    <Create title="Create Measure" {...props}>
      <SimpleForm
        defaultValue={{ ClientId: client_id }}
        redirect={`/clients/${client_id}/show/measures`}
      >
        <TextInput source="description" validate={validateDescription} />
        <DateInput
          source="success"
          label="Success Date"
          validate={validateDate}
          className="mx-auto"
        />
      </SimpleForm>
    </Create>
  );
};
