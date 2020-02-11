import React from 'react';
import { Edit, Create, SimpleForm, TextInput, BooleanInput } from 'react-admin';
import { parse } from 'query-string';

export const MeasureEdit = props => (
  <Edit title="Edit Client Measure" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput disabled source="ClientId" />
      <TextInput source="description" />
      <BooleanInput source="success" />
    </SimpleForm>
  </Edit>
);

export const MeasureCreate = props => {
  const { client_id } = parse(props.location.search);
  return (
    <Create title="Create Measure" {...props}>
      <SimpleForm defaultValue={{ ClientId: client_id }}>
        <TextInput disabled source="id" />
        <TextInput disabled source="ClientId" />
        <TextInput source="description" />
        <BooleanInput source="success" />
      </SimpleForm>
    </Create>
  );
};
