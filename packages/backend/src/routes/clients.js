const router = require('express').Router();
const {
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../controllers/client');
const { checkAuth } = require('../middleware/authentication');

router.get('/', getAll);
router.get('/:clientId', getById);

// Protected routes
router.put('/:clientId', checkAuth, updateById);
router.post('/', checkAuth, createOne);
router.delete('/:clientId', checkAuth, deleteById);

module.exports = router;
