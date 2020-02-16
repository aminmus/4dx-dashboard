const router = require('express').Router();
// const passport = require('passport');
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/user');
const { isAuthenticated } = require('../auth/auth');

// Require authentication
router.all('/', isAuthenticated);

router.get('/', getAll);
router.get('/:userId', getById);
router.put('/:userId', updateById);
router.post('/', createOne);
router.delete('/:userId', deleteById);

module.exports = router;
