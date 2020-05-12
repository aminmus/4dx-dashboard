import jsonapiClient from 'ra-jsonapi-client';

/**
 * Data provider for react-admin, handles calls to the backend API
 * @module
 */

const settings = {
  updateMethod: 'PUT',
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
};

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT}`;

export default jsonapiClient(`${baseUrl}/api`, settings);
