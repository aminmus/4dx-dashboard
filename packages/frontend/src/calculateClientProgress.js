export default clients => {
  const clientNames = clients.map(client => client.name);
  const clientMeasures = clients.map(client => client.Measures);
  const progressArray = [];
  for (let i = 0; i < clientNames.length; i += 1) {
    const newElement = {};
    newElement.name = clientNames[i];
    let score = 0;
    let total = 0;
    for (let j = 0; j < clientMeasures[i].length; j += 1) {
      if (clientMeasures[i][j].success) {
        score += 1;
      }
      total += 1;
    }
    newElement.progress = clientMeasures[i].length === 0 ? 'empty' : `${score}/${total}`;
    progressArray.push(newElement);
  }
  return progressArray;
};
