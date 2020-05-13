// Initial redux store state

const auth = {
  isLoggedIn: false,
  isAdmin: false
};

const editMode = {
  editModeEnabled: false
};

const resources = {
  data: {
    clients: [],
    measureGoals: [],
    nps: []
  },
  isFetching: false
};

export default {
  auth,
  editMode,
  resources
};
