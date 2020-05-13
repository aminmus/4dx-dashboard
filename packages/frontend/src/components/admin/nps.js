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
  NumberInput
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import { validateNps, validateDateRequired } from '../../utils/react-admin/adminValidation';
import { DateInput } from './DateInput';
import DateField from './DateField';
import COLORS from '../../style/COLORS';

const { dark } = COLORS;

const listStyles = {
  root: {
    backgroundColor: dark,
    border: '1px solid black',
    justifyContent: 'center',
    borderRadius: '0.2em',
    textAlign: 'center'
  }
};

export const NpsList = withStyles(listStyles)(({ classes, ...props }) => (
  <List classes={classes} {...props} bulkActionButtons={false}>
    <Datagrid classes={classes} rowClick="edit" isRowSelectable={() => false}>
      <NumberField source="current-nps" label="NPS" />
      <DateField source="date" />
      <NumberField source="goal-nps" label="Target NPS" />
      <DateField source="target-date" label="Target date" />
      <EditButton />
      <DeleteButton undoable={false} />
    </Datagrid>
  </List>
));

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
