const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/measure');
const { checkAuth } = require('../middleware/authentication');

router.get('/', getAll);
router.get('/:measureId', getById);

// Protected routes
router.put('/:measureId', checkAuth, updateById);
router.post('/', checkAuth, createOne);
router.delete('/:clientId', checkAuth, deleteById);

module.exports = router;
