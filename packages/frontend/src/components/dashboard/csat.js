/* eslint-disable camelcase, import/no-extraneous-dependencies, react/destructuring-assignment, react/jsx-props-no-spreading, react/prop-types */

import React from 'react';
import { Edit, Create, SimpleForm, TextInput, DateInput, NumberInput } from 'react-admin';
import { parse } from 'query-string';

export const CsatEdit = props => {
  const { client_id } = parse(props.location.search);
  return (
    <Edit title="Edit Client Satisfaction score" {...props}>
      <SimpleForm redirect={`/clients/${client_id}/show/csat`}>
        <TextInput disabled source="id" />
        <DateInput source="date" />
        <NumberInput source="score" />
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
        <DateInput source="date" />
        <NumberInput source="score" />
      </SimpleForm>
    </Create>
  );
};
