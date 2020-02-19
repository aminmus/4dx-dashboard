import React from 'react';
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin';
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

  const httpClient = (url, optionsArg = {}) => {
    const options = {
      total: null
    };

    options.headers = optionsArg.headers
      ? optionsArg.headers
      : new Headers({ Accept: 'application/json' });
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
  };

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={simpleRestProvider('http://localhost:4000/api', httpClient)}
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
