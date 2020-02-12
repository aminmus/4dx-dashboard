/* eslint-disable no-return-assign, no-param-reassign */
export default clients => {
  return clients.map(client => {
    // Calculate Progress
    const measures = client.Measures.map(measure => measure.success);
    const total = measures.length;
    const lead = measures.reduce(
      (successTotal, success) => (success ? (successTotal += 1) : successTotal),
      0
    );
    // Return reformatted client data
    return {
      name: client.name,
      measures: client.Measures,
      progress: `${lead}/${total}`,
      id: client.id
    };
  });
};
