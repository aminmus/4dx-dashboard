const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/nps');
const { checkAuth } = require('../middleware/auth');

// Require authentication
router.all('/', checkAuth);

router.get('/', getAll);
router.get('/:npsId', getById);
router.put('/:npsId', updateById);
router.post('/', createOne);
router.delete('/:npsId', deleteById);

module.exports = router;
