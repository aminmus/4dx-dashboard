const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/measureGoals');
const { checkAuth } = require('../middleware/authentication');

router.get('/', getAll);
router.get('/:measureGoalId', getById);

// Protected routes
router.put('/:measureGoalId', checkAuth, updateById);
router.post('/', checkAuth, createOne);
router.delete('/:measureGoalId', checkAuth, deleteById);

module.exports = router;
