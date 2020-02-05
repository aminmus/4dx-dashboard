import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { ClientList, ClientCreate, ClientEdit } from '../components/dashboard/client';
import authProvider from '../authProvider';
import Dashboard from './Dashboard';

export default function Login() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={jsonServerProvider('http://localhost:4000/api')}
      dashboard={Dashboard}
    >
      <Resource name="clients" list={ClientList} edit={ClientEdit} create={ClientCreate} />
    </Admin>
  );
}
