/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  EditButton,
  DeleteButton,
  NumberField,
  DateField,
  NumberInput,
  DateInput
} from 'react-admin';
import { validateNps, validateDate } from '../utils/adminValidation';

export const NpsList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="edit" isRowSelectable={() => false}>
      <NumberField source="current-nps" />
      <NumberField source="goal-nps" />
      <DateField source="date" />
      <DateField source="target-date" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const NpsEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="current-nps" validate={validateNps} />
      <NumberInput source="goal-nps" validate={validateNps} />
      <DateInput source="date" validate={validateDate} />
      <DateInput source="target-date" validate={validateDate} />
    </SimpleForm>
  </Edit>
);

export const NpsCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="current-nps" validate={validateNps} />
      <NumberInput source="goal-nps" validate={validateNps} />
      <DateInput source="date" validate={validateDate} />
      <DateInput source="target-date" validate={validateDate} />
    </SimpleForm>
  </Create>
);
