/* 
Add a response type key to each returned client array entry
to make it easier to target the data
*/
const labelResultsWithKey = (data, url) => {
  const key = url.split('api/')[1];
  const reformattedResult = {};
  reformattedResult[key] = data;
  return reformattedResult;
};

export default async () => {
  const baseUrl = `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_SERVER_PORT}`;
  const urls = [
    `${baseUrl}/api/nps`,
    `${baseUrl}/api/clients`,
    `${baseUrl}/api/measures`,
    `${baseUrl}/api/measureGoals`
  ];
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/vnd.api+json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const responseArr = await Promise.all(
    urls.map(url =>
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          return labelResultsWithKey(result, url);
        })
    )
  );

  // Reshape into object with shape of: {nps: {...}, clients: {...} etc}
  return responseArr.reduce((accumulator, current) => ({ ...accumulator, ...current }), {});
};
