const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/client');
const { checkAuth } = require('../middleware/auth');

// Require authentication
router.all('/', checkAuth);

router.get('/', getAll);
router.get('/:clientId', getById);
router.put('/:clientId', updateById);
router.post('/', createOne);
router.delete('/:clientId', deleteById);

module.exports = router;
