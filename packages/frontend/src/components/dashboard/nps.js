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
  DateField
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
      <NumberField source="current-nps" valdiate={validateNps} />
      <NumberField source="goal-nps" valdiate={validateNps} />
      <DateField source="date" valdiate={validateDate} />
      <DateField source="target-date" valdiate={validateDate} />
    </SimpleForm>
  </Edit>
);

export const NpsCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberField source="current-nps" valdiate={validateNps} />
      <NumberField source="goal-nps" valdiate={validateNps} />
      <DateField source="date" valdiate={validateDate} />
      <DateField source="target-date" valdiate={validateDate} />
    </SimpleForm>
  </Create>
);
