export default clients => {
  return {
    totalClients: clients.length,
    definedClients: clients.reduce(
      (defined, client) => (client.measures.length > 0 ? defined + 1 : defined),
      0
    )
  };
};
