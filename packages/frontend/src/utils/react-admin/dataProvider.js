import jsonapiClient from 'ra-jsonapi-client';

export default function() {
  const settings = {
    updateMethod: 'PUT',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  };

  const baseUrl = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT}`;

  return jsonapiClient(`${baseUrl}/api`, settings);
}
