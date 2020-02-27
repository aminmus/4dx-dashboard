const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/csat');
const { checkAuth } = require('../middleware/authentication');

router.get('/', getAll);
router.get('/:csatId', getById);

// Protected routes
router.put('/:csatId', checkAuth, updateById);
router.post('/', checkAuth, createOne);
router.delete('/:clientId', checkAuth, deleteById);

module.exports = router;
