/* eslint-disable no-return-assign, no-param-reassign, no-prototype-builtins, radix */

const collectCsats = clients => {
  return clients.included.filter(entry => (entry.type === 'Csats' ? entry : null));
};

const collectMeasures = clients => {
  return clients.included.filter(entry => (entry.type === 'Measures' ? entry : null));
};

const collectClients = (clients, allMeasures, allCsats) => {
  return clients.data.map(client => {
    // Collect related measure and csat ids
    const { csats, measures } = client.relationships;
    const matchingMeasureIds = measures.data.map(measure => measure.id);
    const matchingCsatIds = csats.data.map(csat => csat.id);

    // Filter away all measures not macthing ids
    const clientMeasures = allMeasures.map(measure =>
      matchingMeasureIds.includes(measure.id) ? measure.attributes : null
    );
    const filteredMeasures = clientMeasures.filter(entry => entry != null);

    const clientCsats = allCsats.map(csat =>
      matchingCsatIds.includes(csat.id) ? csat.attributes : null
    );
    const filteredCsats = clientCsats.filter(entry => entry != null);

    // Calculate progress
    const measureStatusArray = filteredMeasures.map(measure => measure.success);
    const total = measureStatusArray.length;
    const lead = measureStatusArray.reduce(
      (successTotal, success) => (success ? (successTotal += 1) : successTotal),
      0
    );

    return {
      id: parseInt(client.id),
      name: client.attributes.name,
      progress: `${lead}/${total}`,
      measures: filteredMeasures,
      csats: filteredCsats
    };
  });
};

export default clients => {
  if (clients.hasOwnProperty('data') && clients.data.length > 0) {
    if (clients.hasOwnProperty('included') && clients.included.length > 0) {
      return collectClients(clients, collectMeasures(clients), collectCsats(clients));
    }
    return collectClients(clients, [], []);
  }
  return [];
};
