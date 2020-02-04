import React from 'react';
import { Admin, Resource, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import ClientList from '../components/dashboard/ClientList';
import ClientEdit from '../components/dashboard/ClientEdit';
import authProvider from '../authProvider';

export default function Dashboard() {
  const dataProvider = jsonServerProvider('http://localhost:4000/api');
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="clients" list={ClientList} edit={ClientEdit} />
    </Admin>
  );
}
