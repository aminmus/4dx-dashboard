/** Client Satisfaction Score routes
 * @module Router/csat
 * @requires Controllers_csat
 * @requires Middleware_authentication
 * @requires Middleware_permissions
 */

const router = require('express').Router();
const {
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../controllers/csat');
const { checkAuth } = require('../middleware/authentication');
const { canEdit } = require('../middleware/permissions');

/**
 * GET All Csat entries
 *
 * @name GetAllCsat
 * @route {GET} /api/csat
 */
router.get('/', getAll);

/**
 * GET One Csat entry
 *
 * @name GetCsat
 * @route {GET} /api/csat/:id
 * @routeparam {String} :id is the unique identifier for Csat entry
 */
router.get('/:csatId', getById);

/**
 * UPDATE Csat entry
 *
 * @name UpdateCsat
 * @route {PUT} /api/csat/:id
 * @routeparam {String} :id is the unique identifier for csat
 * @bodyparam {Object} data Sequelized Csat Data containing
 *  type and attributes properties for resource
 * @authentication This route requires JWT Authentication.
 */
router.put('/:csatId', checkAuth, canEdit, updateById);

/**
 * POST Csat entry
 *
 * @name PostCsat
 * @route {POST} /api/csat
 * @bodyparam {Object} data Sequelized Csat Data containing
 *  type and attribute properties for resource
 * @authentication This route requires JWT Authentication.
 */
router.post('/', checkAuth, canEdit, createOne);

/**
 * DELETE One Csat entry
 *
 * @name DeleteCsat
 * @route {DELETE} /api/csat/:id
 * @routeparam {String} :id is the unique identifier for csat
 * @authentication This route requires JWT Authentication.
 */
router.delete('/:csatId', checkAuth, canEdit, deleteById);

module.exports = router;
