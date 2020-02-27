const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/nps');
const { checkAuth } = require('../middleware/authentication');

router.get('/', getAll);
router.get('/:npsId', getById);

// Protected routes
router.put('/:npsId', checkAuth, updateById);
router.post('/', checkAuth, createOne);
router.delete('/:npsId', checkAuth, deleteById);

module.exports = router;
