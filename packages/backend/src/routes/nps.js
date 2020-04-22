/** Nps routes
 * @module Router/nps
 * @requires express
 * @requires ../controllers/nps
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
} = require('../controllers/nps');
const { checkAuth } = require('../middleware/authentication');
const { canEdit } = require('../middleware/permissions');

/**
 * GET All Nps entries
 *
 * @name GetAllNps
 * @route {GET} /api/nps
 */
router.get('/', getAll);

/**
 * GET One Nps entry
 *
 * @name GetNps
 * @route {GET} /api/nps/:id
 * @routeparam {String} :id The unique identifier for nps
 */
router.get('/:npsId', getById);

/**
 * UPDATE Nps entry
 *
 * @name UpdateMeasure
 * @route {PUT} /api/nps/:id
 * @routeparam {String} :id The unique identifier for nps
 * @bodyparam {Object} data Sequelized Nps Data containing
 *  type and attributes properties for resource
 * @authentication This route requires JWT Authentication.
 */
router.put('/:npsId', checkAuth, canEdit, updateById);

/**
 * POST Nps entry
 *
 * @name PostNps
 * @route {POST} /api/nps
 * @authentication This route requires JWT Authentication.
 * @bodyparam {Object} data Sequelized Nps Data containing
 *  type and attribute properties for resource
 */
router.post('/', checkAuth, canEdit, createOne);

/**
 * DELETE One Nps entry
 *
 * @name DeleteNps
 * @route {DELETE} /api/nps/:id
 * @routeparam {String} :id The unique identifier for nps
 * @authentication This route requires JWT Authentication.
 */
router.delete('/:npsId', checkAuth, canEdit, deleteById);

module.exports = router;
