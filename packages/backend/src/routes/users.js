/** User routes
 * @module Router/users
 * @requires Controllers_user
 * @requires Middleware_authentication
 */

const router = require('express').Router();
const {
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../controllers/user');
const { checkAuth } = require('../middleware/authentication');

// Require authentication
router.all('*', checkAuth);

/**
 * GET All Users
 *
 * @name GetAllUsers
 * @route {GET} /api/users
 * @authentication This route requires JWT Authentication.
 */
router.get('/', getAll);

/**
 * GET One User
 *
 * @name GetUser
 * @route {GET} /api/users/:id
 * @routeparam {String} :id The unique identifier for users
 */
router.get('/:userId', getById);

/**
 * UPDATE User
 *
 * @name UpdateUser
 * @route {PUT} /api/users/:id
 * @routeparam {String} :id The unique identifier for users
 * @bodyparam {Object} data Sequelized User Data containing
 *  type and attributes properties for resource
 * @authentication This route requires JWT Authentication.
 */
router.put('/:userId', updateById);

/**
 * POST User
 *
 * @name PostUser
 * @route {POST} /api/users
 * @bodyparam {Object} data Sequelized User Data containing
 *  type and attribute properties for resource
 * @authentication This route requires JWT Authentication.
 */
router.post('/', createOne);

/**
 * DELETE One User
 *
 * @name DeleteUser
 * @route {DELETE} /api/users/:id
 * @routeparam {String} :id The unique identifier for users
 * @authentication This route requires JWT Authentication.
 */
router.delete('/:userId', deleteById);

module.exports = router;
