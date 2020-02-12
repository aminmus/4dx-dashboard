/*
Calculate lead status based on clients
Lead = Measures fulfilled 
Lead Total = Total number of measures implemented
*/
export default clients => {
  const clientMeasures = clients.map(client => client.Measures);
  const definedStatus = {};
  const totalClients = clients.length;
  let definedClients = 0;
  for (let i = 0; i < clientMeasures.length; i += 1) {
    if (clientMeasures[i].length > 0) {
      definedClients += 1;
    }
  }
  definedStatus.totalClients = totalClients;
  definedStatus.definedClients = definedClients;

  return definedStatus;
};
