// Helper for making requests to the backend
export const backendFetch = async (urlPath, httpMethod = 'GET', body = undefined) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT}/api/${urlPath}`;
  const token = localStorage.getItem('token');
  const options = {
    method: httpMethod,
    headers: new Headers({
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
      Authorization: token ? `Bearer ${token}` : undefined
    }),
    redirect: 'follow',
    body: JSON.stringify(body)
  };
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return console.error(error);
  }
};

/* 
Add a response type key to each returned client array entry
to make it easier to target the data
*/
const labelResultsWithKey = (data, url) => ({ [url]: data });

// Get all resources
export default async () => {
  const responseArr = await Promise.all(
    ['nps', 'clients', 'measures', 'measureGoals'].map(async url => {
      const response = await backendFetch(url);
      return labelResultsWithKey(response, url);
    })
  );

  // Reshape into object with shape of: {nps: {...}, clients: {...} etc}
  return responseArr.reduce((accumulator, current) => ({ ...accumulator, ...current }), {});
};
