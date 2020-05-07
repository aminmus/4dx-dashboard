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
import { validateNps, validateDateRequired } from '../../utils/react-admin/adminValidation';

export const NpsList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="edit" isRowSelectable={() => false}>
      <NumberField source="current-nps" label="NPS" />
      <DateField source="date" />
      <NumberField source="goal-nps" label="Target NPS" />
      <DateField source="target-date" label="Target date" />
      <EditButton />
      <DeleteButton undoable={false} />
    </Datagrid>
  </List>
);

export const NpsEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="current-nps" label="NPS score" validate={validateNps} />
      <DateInput source="date" validate={validateDateRequired} />
      <NumberInput source="goal-nps" label="Target NPS" validate={validateNps} />
      <DateInput source="target-date" label="Target date" validate={validateDateRequired} />
    </SimpleForm>
  </Edit>
);

export const NpsCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="current-nps" label="NPS score" validate={validateNps} />
      <DateInput source="date" validate={validateDateRequired} />
      <NumberInput source="goal-nps" label="Target NPS" validate={validateNps} />
      <DateInput source="target-date" label="Target date" validate={validateDateRequired} />
    </SimpleForm>
  </Create>
);
