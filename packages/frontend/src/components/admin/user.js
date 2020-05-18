import React from 'react';
import { List, SimpleList, Datagrid, TextField, DeleteButton } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateField from './DateField';
import formatDate from '../../utils/formatDate';
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

const UserList = props => {
  const classes = useStyles();
  const isSmall = useMediaQuery('(max-width:600px)');
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <List classes={classes} {...props} bulkActionButtons={false}>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.email}
          secondaryText={record => `Last updated: ${formatDate(record['updated-at'])}`}
          tertiaryText={record => `Created: ${formatDate(record['created-at'])}`}
          linkType="show"
        />
      ) : (
        <Datagrid isRowSelectable={() => false}>
          <TextField source="id" />
          <TextField source="email" />
          <DateField source="created-at" label="Created at" />
          <DateField source="updated-at" label="Updated at" />
          <DeleteButton undoable={false} />
        </Datagrid>
      )}
    </List>
  );
};

export default UserList;
