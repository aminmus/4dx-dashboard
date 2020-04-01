const router = require('express').Router();
const {
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../controllers/client');
const { checkAuth } = require('../middleware/authentication');
const { canEdit } = require('../middleware/permissions');

router.get('/', getAll);
router.get('/:clientId', getById);

// Protected routes
router.put('/:clientId', checkAuth, canEdit, updateById);
router.post('/', checkAuth, canEdit, createOne);
router.delete('/:clientId', checkAuth, canEdit, deleteById);

module.exports = router;
