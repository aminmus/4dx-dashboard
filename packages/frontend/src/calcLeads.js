/*
Calculate lead status based on clients
Lead = Measures fulfilled 
Lead Total = Total number of measures implemented
*/
export default clients => {
  const clientNames = clients.map(client => client.name);
  const clientMeasures = clients.map(client => client.Measures);
  const leadsStatus = {};
  let leads = 0;
  let leadsTotal = 0;
  for (let i = 0; i < clientNames.length; i += 1) {
    for (let j = 0; j < clientMeasures[i].length; j += 1) {
      if (clientMeasures[i][j].success) {
        leads += 1;
      }
      leadsTotal += 1;
    }
  }
  leadsStatus.leads = leads;
  leadsStatus.leadsTotal = leadsTotal;
  return leadsStatus;
};
