/**
 * @module
 */

//

/**
 * Helper function for making requests to the backend
 * @async
 * @function
 * @param {string} urlPath
 * @param {string} [httpMethod='GET']
 * @param {Object} [body=undefined] request body
 * @returns {Promise<Object>} Response
 */
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
    body: body ? JSON.stringify(body) : undefined
  };
  try {
    const response = await fetch(url, options);
    return httpMethod !== 'DELETE' ? response.json() : response;
  } catch (error) {
    return console.error(error);
  }
};

/**
 * Add a response type key to each returned array entry
 * to make it easier to target the data
 * @function
 * @param {Object} data
 * @param {string} url
 * @return {Object}
 */
const labelResultsWithKey = (data, url) => ({ [url]: data });

/**
 * Request all resources from the backend
 * @async
 * @function
 * @return {Object} Object containing the retrieved resources
 */
const getAllResources = async () => {
  const responseArr = await Promise.all(
    ['nps', 'clients', 'measures', 'measureGoals'].map(async url => {
      const response = await backendFetch(url);
      return labelResultsWithKey(response, url);
    })
  );

  // Reshape into object with shape of: {nps: {...}, clients: {...} etc}
  return responseArr.reduce((accumulator, current) => ({ ...accumulator, ...current }), {});
};

export default getAllResources;
