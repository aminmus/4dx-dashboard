/**
 * Permissions middlware
 * @module middleware_permissions
 * @requires ../utils/roles
 */

/**
 * User role types
 * @type {Object}
 */
const ROLES = require('../utils/roles');

/**
 * Check if user role permits them to edit data
 * @function
 * @memberof module:middleware_permissions
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const canEdit = async (req, res, next) => {
  const { role } = await req.user;

  if (!role) {
    return res.status(404).json({
      error: { title: 'User has no role' },
      data: null,
    });
  }
  if (role !== ROLES.admin) {
    return res.status(404).json({
      error: { title: 'Invalid user permission' },
      data: null,
    });
  }

  return next();
};

module.exports = { canEdit };
