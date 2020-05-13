/** Measure Goals routes
 * @module Router/measure_goals
 * @requires Controllers_measure_goals
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
} = require('../controllers/measureGoals');
const { checkAuth } = require('../middleware/authentication');
const { canEdit } = require('../middleware/permissions');

/**
 * GET All Measure Goals
 *
 * @name GetAllMeasureGoals
 * @route {GET} /api/measureGoals
 */
router.get('/', getAll);

/**
 * GET One Measure Goal
 *
 * @name GetMeasureGoal
 * @route {GET} /api/measureGoals/:id
 * @routeparam {String} :id The unique identifier for measure goal
 */
router.get('/:measureGoalId', getById);

/**
 * UPDATE Measure Goal
 *
 * @name UpdateMeasureGoal
 * @route {PUT} /api/measureGoals/:id
 * @routeparam {String} :id The unique identifier for measure goal
 * @bodyparam {Object} data Sequelized Measure Goal Data containing
 *  type and attributes properties for resource
 * @authentication This route requires JWT Authentication.
 */
router.put('/:measureGoalId', checkAuth, canEdit, updateById);

/**
 * POST Measure Goal
 *
 * @name PostMeasureGoal
 * @route {POST} /api/measureGoals
 * @bodyparam {Object} data Sequelized Measure Goal Data containing
 *  type and attribute properties for resource
 * @authentication This route requires JWT Authentication.
 */
router.post('/', checkAuth, canEdit, createOne);

/**
 * DELETE One Measure Goal
 *
 * @name DeleteMeasureGoal
 * @route {DELETE} /api/measureGoals/:id
 * @routeparam {String} :id The unique identifier for measure goals
 * @authentication This route requires JWT Authentication.
 */
router.delete('/:measureGoalId', checkAuth, canEdit, deleteById);

module.exports = router;
