/**
 * @Module
 */

/**
 * Calculate defined clients
 * @function
 * @param {Array} clients
 * @returns {Object} Defined clients data
 */
const calcDefineClients = clients => ({
  totalClients: clients.length,
  definedClients: clients.reduce(
    (defined, client) => (client?.measures?.length > 0 ? defined + 1 : defined),
    0
  )
});

export default calcDefineClients;
