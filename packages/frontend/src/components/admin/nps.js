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
  NumberInput,
  SimpleList
} from 'react-admin';
import { useMediaQuery, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { validateNps, validateDateRequired } from '../../utils/react-admin/adminValidation';
import DateInput from './DateInput';

import DateField from './DateField';
import COLORS from '../../style/COLORS';

const { dark } = COLORS;

const useStyles = makeStyles({
  root: {
    backgroundColor: dark,
    border: '1px solid black',
    justifyContent: 'center',
    borderRadius: '0.2em',
    textAlign: 'center'
  }
});

export const NpsList = props => {
  const classes = useStyles();
  const isSmall = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Typography variant="h2">NPS</Typography>
      <List classes={classes} {...props} bulkActionButtons={false}>
        {isSmall ? (
          <SimpleList
            primaryText={record => `${record['current-nps']} NPS`}
            secondaryText={record =>
              // eslint-disable-next-line prettier/prettier
              `Target: ${record['goal-nps']} NPS by ${record['target-date']}`}
            tertiaryText={record => record.date}
          />
        ) : (
          <Datagrid rowClick="edit" isRowSelectable={() => false}>
            <NumberField source="current-nps" label="NPS" />
            <DateField source="date" />
            <NumberField source="goal-nps" label="Target NPS" />
            <DateField source="target-date" label="Target date" />
            <EditButton />
            <DeleteButton undoable={false} />
          </Datagrid>
        )}
      </List>
    </>
  );
};

export const NpsEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="current-nps" label="NPS" validate={validateNps} />
      <DateInput source="date" validate={validateDateRequired} />
      <NumberInput source="goal-nps" label="Target NPS" validate={validateNps} />
      <DateInput source="target-date" label="Target date" validate={validateDateRequired} />
    </SimpleForm>
  </Edit>
);

export const NpsCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm redirect="list">
      <NumberInput source="current-nps" label="NPS" validate={validateNps} />
      <DateInput source="date" validate={validateDateRequired} />
      <NumberInput source="goal-nps" label="Target NPS" validate={validateNps} />
      <DateInput source="target-date" label="Target date" validate={validateDateRequired} />
    </SimpleForm>
  </Create>
);
