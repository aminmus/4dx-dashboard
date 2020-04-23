/** Measures routes
 * @module Router/measures
 * @requires express
 * @requires ../controllers/measures
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
} = require('../controllers/measure');
const { checkAuth } = require('../middleware/authentication');
const { canEdit } = require('../middleware/permissions');

/**
 * GET All Measures
 *
 * @name GetAllMeasures
 * @route {GET} /api/measures
 */
router.get('/', getAll);

/**
 * GET One Measure
 *
 * @name GetMeasure
 * @route {GET} /api/measure/:id
 * @routeparam {String} :id The unique identifier for measure
 */
router.get('/:measureId', getById);

/**
 * UPDATE Measure
 *
 * @name UpdateMeasure
 * @route {PUT} /api/measure/:id
 * @routeparam {String} :id The unique identifier for measure
 * @bodyparam {Object} data Sequelized Measure Data containing
 *  type and attributes properties for resource
 * @authentication This route requires JWT Authentication.
 */
router.put('/:measureId', checkAuth, canEdit, updateById);

/**
 * POST Measure
 *
 * @name PostMeasure
 * @route {POST} /api/measure
 * @authentication This route requires JWT Authentication.
 * @bodyparam {Object} data Sequelized Measure Data containing
 *  type and attribute properties for resource
 */
router.post('/', checkAuth, canEdit, createOne);

/**
 * DELETE One Measure
 *
 * @name DeleteMeasure
 * @route {DELETE} /api/measure/:id
 * @routeparam {String} :id The unique identifier for measure
 * @authentication This route requires JWT Authentication.
 */
router.delete('/:measureId', checkAuth, canEdit, deleteById);

module.exports = router;
