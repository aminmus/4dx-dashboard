const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../../controllers/nps');
const { isAuthenticated } = require('../../auth/auth');

// Require authentication
router.all('/', isAuthenticated);

router.get('/', getAll);
router.get('/:npsId', getById);
router.put('/:npsId', updateById);
router.post('/', createOne);
router.delete('/:npsId', deleteById);

module.exports = router;
