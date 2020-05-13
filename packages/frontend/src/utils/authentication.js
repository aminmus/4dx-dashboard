/**
 * @module
 */

/**
 * Check if user is authenticated
 * @function
 * @returns {boolean}
 */
const isAuthenticated = () => {
  return Boolean(localStorage.getItem('token'));
};

export default isAuthenticated;
