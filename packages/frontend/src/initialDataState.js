const initialState = {
  clients: [{ id: 0, name: 'No Clients Available', measures: [], csats: [] }],
  measures: [],
  measuresGoal: { targetMeasures: null, targetDate: null },
  definedStatus: { totalClients: 0, definedClients: 0 },
  leadStatus: { leads: 0, leadsTotal: 0 },
  nps: {
    description: 'N/A',
    current: 0,
    goal: 0,
    targetDate: 'N/A',
    defineText: 'Define the Success factors for listed clients',
    implementText: 'Implement Client Success Program for listed clients'
  },
  chart: { months: [], values: [], target: null }
};

export default initialState;
