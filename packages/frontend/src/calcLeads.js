/* eslint-disable no-return-assign, no-param-reassign */
export default clients => {
  // Collect measures over all clients and collect these
  const measuresArray = clients.map(client => client.Measures);

  // Flatten array into a single array of all measures
  const flatMeasuresArray = measuresArray.reduce(
    (measureTotal, measure) => measureTotal.concat(measure),
    []
  );
  return {
    leads: flatMeasuresArray.reduce((successfulMeasure, measure) => {
      return measure.success ? (successfulMeasure += 1) : successfulMeasure;
    }, 0),
    leadsTotal: flatMeasuresArray.length
  };
};
