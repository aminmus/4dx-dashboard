const auth = {
  isLoggedIn: false,
  isAdmin: false
};

const editMode = {
  editModeEnabled: false
};

const computed = {
  definedStatus: { totalClients: 0, definedClients: 0 },
  leadStatus: { leads: 0, leadsTotal: 0 },
  chart: { months: [], values: [], target: null }
};

const resources = {
  clients: [{ id: 0, name: 'No Clients Available', measures: [], csats: [] }],
  measures: [],
  measuresGoal: { targetMeasures: null, targetDate: null },
  nps: {
    description: 'N/A',
    current: 0,
    goal: 0,
    targetDate: 'N/A',
    defineText: 'Define the Success factors for listed clients',
    implementText: 'Implement Client Success Program for listed clients'
  }
};

export default {
  auth,
  editMode,
  computed,
  resources
};
