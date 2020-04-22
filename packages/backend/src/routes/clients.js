/** Client routes
 * @module Router/clients
 * @requires express
 * @requires ../controllers/client
 * @requires ../middleware/authentication
 * @requires ../middleware/permissions
 */

const router = require('express').Router();
const {
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../controllers/client');
const { checkAuth } = require('../middleware/authentication');
const { canEdit } = require('../middleware/permissions');

/**
 * Get All Clients
 *
 * @name GetAllClients
 * @route {GET} /api/clients
 */
router.get('/', getAll);

/**
 * GET One Client
 *
 * @name GetClient
 * @route {GET} /api/clients/:id
 */
router.get('/:clientId', getById);

/**
 * UPDATE Client
 *
 * @name UpdateClient
 * @route {PUT} /api/clients/:id
 * @authentication This route requires JWT Authentication.
 */
router.put('/:clientId', checkAuth, canEdit, updateById);

/**
 * POST Client
 *
 * @name PostClient
 * @route {POST} /api/clients
 * @authentication This route requires JWT Authentication.
 */
router.post('/', checkAuth, canEdit, createOne);

/**
 * DELETE One Client
 *
 * @name DeleteClient
 * @route {DELETE} /api/clients/:id
 * @authentication This route requires JWT Authentication.
 */
router.delete('/:clientId', checkAuth, canEdit, deleteById);

module.exports = router;
