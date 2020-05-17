/* eslint-disable  react/jsx-props-no-spreading, react/prop-types, react/destructuring-assignment */
import React from 'react';
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  TextInput,
  EditButton,
  DeleteButton,
  Show,
  ShowButton,
  TabbedShowLayout,
  Tab,
  ReferenceManyField,
  NumberField,
  SimpleShowLayout,
  SimpleList
} from 'react-admin';
import { Button, Typography, useMediaQuery } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import FalseIcon from '@material-ui/icons/Clear';
import TrueIcon from '@material-ui/icons/Done';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import DateField from './DateField';
import { validateName } from '../../utils/react-admin/adminValidation';
import COLORS from '../../style/COLORS';

const { dark } = COLORS;

const headerStyles = {
  root: {
    backgroundColor: dark,
    border: '1px solid black',
    justifyContent: 'center',
    borderRadius: '0.2em'
  }
};

export const ClientList = props => {
  // Using MUI theme breakpoints here did not work as planned, so setting explicitly instead
  const isSmall = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Typography variant="h2">Clients</Typography>
      <List {...props} bulkActionButtons={false}>
        {isSmall ? (
          <SimpleList primaryText={record => record.name} linkType="show" />
        ) : (
          <Datagrid
            style={{ justifyContent: 'center', textAlign: 'center' }}
            rowClick="show"
            isRowSelectable={() => false}
          >
            <TextField source="name" />
            <EditButton />
            <DeleteButton undoable={false} />
            <ShowButton />
          </Datagrid>
        )}
      </List>
    </>
  );
};

export const ClientEdit = props => (
  <Edit title="Edit client entry" {...props}>
    <SimpleForm redirect="show">
      <TextInput source="name" validate={validateName} />
    </SimpleForm>
  </Edit>
);

export const ClientCreate = props => (
  <Create title="Create client entry" {...props}>
    <SimpleForm redirect="show">
      <TextInput source="name" validate={validateName} />
    </SimpleForm>
  </Create>
);

const AddNewClientScore = ({ record }) => (
  <Button
    component={Link}
    color="primary"
    variant="contained"
    to={{
      pathname: '/csat/create',
      search: `?client_id=${record.id}`
    }}
  >
    Add client score
  </Button>
);

const AddNewClientMeasure = ({ record }) => (
  <Button
    component={Link}
    color="primary"
    variant="contained"
    to={{
      pathname: '/measures/create',
      search: `?client_id=${record.id}`
    }}
  >
    Add client measure
  </Button>
);

const EditClientScore = ({ record, clientId }) => {
  /*
  Custom edit button exists to pass along the client id to
  the edit context. Otherwise it is lost and redirect won't
  work 
  */
  return (
    <Button
      component={Link}
      to={{
        pathname: `/csat/${record.id}`,
        search: `?client_id=${clientId}`
      }}
    >
      <EditIcon />
      <Typography variant="body1" className="px-1">
        EDIT
      </Typography>
    </Button>
  );
};

const EditClientMeasure = ({ record, clientId }) => {
  /*
  Custom edit button exists to pass along the client id to
  the edit context. Otherwise it is lost and redirect won't
  work 
  */
  return (
    <Button
      component={Link}
      to={{
        pathname: `/measures/${record.id}`,
        search: `?client_id=${clientId}`
      }}
    >
      <EditIcon />
      <Typography variant="body1" className="px-1">
        EDIT
      </Typography>
    </Button>
  );
};

const CustomBooleanField = ({ record }) => {
  if (record.success) {
    return <TrueIcon />;
  }
  return <FalseIcon />;
};

export const ClientShow = withStyles(headerStyles)(({ classes, ...props }) => {
  const editCsatClick = (id, _basePath, _record) => {
    return `/csat/${id}?client_id=${props.id}`;
  };
  const editMeasuresClick = (id, _basePath, _record) => {
    return `/measures/${id}?client_id=${props.id}`;
  };

  return (
    <Show classes={classes} {...props}>
      <TabbedShowLayout classes={classes}>
        <Tab label="summary">
          <SimpleShowLayout>
            <TextField label="Client Name" source="name" />
          </SimpleShowLayout>
        </Tab>
        <Tab label="Client Satisfaction" path="csat">
          <SimpleShowLayout>
            <AddNewClientScore />
            <ReferenceManyField reference="csat" target="clientId" addLabel={false}>
              <Datagrid rowClick={editCsatClick}>
                <NumberField label="Score" source="score" />
                <DateField label="Date of Score" source="date" />
                <EditClientScore {...props} clientId={props.id} />
                <DeleteButton redirect={`/clients/${props.id}/show/csat`} />
              </Datagrid>
            </ReferenceManyField>
          </SimpleShowLayout>
        </Tab>
        <Tab label="Measures" path="measures">
          <SimpleShowLayout>
            <AddNewClientMeasure />
            <ReferenceManyField reference="measures" target="clientId" addLabel={false}>
              <Datagrid rowClick={editMeasuresClick}>
                <TextField source="description" />
                <CustomBooleanField label="Success" {...props} />
                <EditClientMeasure {...props} clientId={props.id} />
                <DeleteButton redirect={`/clients/${props.id}/show/measures`} />
              </Datagrid>
            </ReferenceManyField>
          </SimpleShowLayout>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
});
