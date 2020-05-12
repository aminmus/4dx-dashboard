/**
 * @module
 */

/**
 * Calculate lead measures
 * @function
 * @param {Array} clients
 * @returns {Object} Lead measures data
 */
const calcLeads = clients => {
  // Collect measures over all clients and collect these
  const measuresArray = clients.map(client => client.measures);

  // Flatten array into a single array of all measures
  const flatMeasuresArray = measuresArray.reduce(
    (measureTotal, measure) => measureTotal.concat(measure),
    []
  );
  return {
    leads: flatMeasuresArray.reduce(
      (successfulMeasure, measure) =>
        measure?.success ? successfulMeasure + 1 : successfulMeasure,
      0
    ),
    leadsTotal: flatMeasuresArray.length
  };
};

export default calcLeads;
