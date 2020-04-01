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

router.get('/', getAll);
router.get('/:measureGoalId', getById);

// Protected routes
router.put('/:measureGoalId', checkAuth, canEdit, updateById);
router.post('/', checkAuth, canEdit, createOne);
router.delete('/:measureGoalId', checkAuth, canEdit, deleteById);

module.exports = router;
