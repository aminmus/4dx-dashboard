const auth = {
  isLoggedIn: false,
  isAdmin: false
};

const editMode = {
  editModeEnabled: false
};

// Other state that is generated client side
const computed = {
  definedStatus: { totalClients: 0, definedClients: 0 },
  leadStatus: { leads: 0, leadsTotal: 0 },
  chart: { months: [], values: [], target: null }
};

const resources = {
  data: {
    clients: [],
    measures: [],
    measureGoals: [],
    nps: []
  },
  isFetching: false
};

export default {
  auth,
  editMode,
  computed,
  resources
};
