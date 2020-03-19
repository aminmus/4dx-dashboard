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
      <NumberInput source="current-nps" valdiate={validateNps} />
      <NumberInput source="goal-nps" valdiate={validateNps} />
      <DateInput source="date" valdiate={validateDate} />
      <DateInput source="target-date" valdiate={validateDate} />
    </SimpleForm>
  </Edit>
);

export const NpsCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="current-nps" valdiate={validateNps} />
      <NumberInput source="goal-nps" valdiate={validateNps} />
      <DateInput source="date" valdiate={validateDate} />
      <DateInput source="target-date" valdiate={validateDate} />
    </SimpleForm>
  </Create>
);
