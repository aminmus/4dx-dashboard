// in src/authProvider.js
export default {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    const request = new Request('http://localhost:4000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/vnd.api+json' })
    });

    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) throw new Error(response.statusText);
    const { token } = await response.json();
    localStorage.setItem('email', username);
    return localStorage.setItem('token', token);
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('email');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem('email') ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve()
};
