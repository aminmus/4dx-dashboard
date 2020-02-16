const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/csat');
const { checkAuth } = require('../middleware/authentication');

// Require authentication
router.all('/', checkAuth);

router.get('/', getAll);
router.get('/:csatId', getById);
router.put('/:csatId', updateById);
router.post('/', createOne);
router.delete('/:clientId', deleteById);

module.exports = router;
