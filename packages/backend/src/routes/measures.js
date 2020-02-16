const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/measure');
const { isAuthenticated } = require('../auth/auth');


router.all('/', isAuthenticated);

router.get('/', getAll);
router.get('/:measureId', getById);
router.put('/:measureId', updateById);
router.post('/', createOne);
router.delete('/:clientId', deleteById);

module.exports = router;
