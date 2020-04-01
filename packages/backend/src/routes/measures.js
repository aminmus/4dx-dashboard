const router = require('express').Router();
const {
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../controllers/measure');
const { checkAuth } = require('../middleware/authentication');
const { canEdit } = require('../middleware/permissions');

router.get('/', getAll);
router.get('/:measureId', getById);

// Protected routes
router.put('/:measureId', checkAuth, canEdit, updateById);
router.post('/', checkAuth, canEdit, createOne);
router.delete('/:measureId', checkAuth, canEdit, deleteById);

module.exports = router;
