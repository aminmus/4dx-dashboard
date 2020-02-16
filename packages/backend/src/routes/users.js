const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/user');
const { checkAuth } = require('../middleware/authentication');

// Require authentication
router.all('/', checkAuth);

router.get('/', getAll);
router.get('/:userId', getById);
router.put('/:userId', updateById);
router.post('/', createOne);
router.delete('/:userId', deleteById);

module.exports = router;
