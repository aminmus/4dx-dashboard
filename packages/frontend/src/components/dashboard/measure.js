/* eslint-disable camelcase, import/no-extraneous-dependencies, react/destructuring-assignment, react/jsx-props-no-spreading, react/prop-types */

import React from 'react';
import {
  Edit,
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
  minLength,
  maxLength
} from 'react-admin';
import { parse } from 'query-string';

const validateSuccess = [required()];
const validateDescription = [required(), minLength(5), maxLength(100)];

export const MeasureEdit = props => {
  const { client_id } = parse(props.location.search);
  return (
    <Edit title="Edit Client Measure" {...props}>
      <SimpleForm redirect={`/clients/${client_id}/show/measures`}>
        <TextInput disabled source="id" />
        <TextInput source="description" validate={validateDescription} />
        <BooleanInput source="success" validate={validateSuccess} className="mx-auto" />
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
        <BooleanInput source="success" validate={validateSuccess} className="mx-auto" />
      </SimpleForm>
    </Create>
  );
};
