const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../../controllers/user');

router.get('/users', getAll);
router.get('/users/:userId', getById);
router.put('/users/:userId', updateById);
router.post('/users', createOne);
router.delete('/users/:userId', deleteById);

module.exports = router;
