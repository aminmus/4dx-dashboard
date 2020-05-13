/**
 * Permissions middlware
 * @module Middleware_permissions
 * @requires Utils/roles
 */

/**
 * User role types
 * @type {Object}
 */
const ROLES = require('../utils/roles');

/**
 * Check if user role permits them to edit data
 * @function
 * @memberof module:Middleware_permissions
 * @param {Object} req Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Next middleware
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
