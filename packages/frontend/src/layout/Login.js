import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { createMuiTheme } from '@material-ui/core/styles';
import simpleRestProvider from 'ra-data-simple-rest';
import { ClientList, ClientEdit, ClientShow, ClientCreate } from '../components/dashboard/client';
import authProvider from '../authProvider';
import Dashboard from './Dashboard';
import { CsatEdit, CsatCreate } from '../components/dashboard/csat';
import { MeasureEdit, MeasureCreate } from '../components/dashboard/measure';

export default function Login() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={simpleRestProvider('http://localhost:4000/api')}
      dashboard={Dashboard}
      theme={theme}
    >
      <Resource
        name="clients"
        create={ClientCreate}
        list={ClientList}
        edit={ClientEdit}
        show={ClientShow}
      />
      <Resource name="csat" edit={CsatEdit} create={CsatCreate} />
      <Resource name="measures" edit={MeasureEdit} create={MeasureCreate} />
      <Resource name="users" list={ListGuesser} />
    </Admin>
  );
}
