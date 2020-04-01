const router = require('express').Router();
const {
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../controllers/csat');
const { checkAuth } = require('../middleware/authentication');
const { canEdit } = require('../middleware/permissions');

router.get('/', getAll);
router.get('/:csatId', getById);

// Protected routes
router.put('/:csatId', checkAuth, canEdit, updateById);
router.post('/', checkAuth, canEdit, createOne);
router.delete('/:csatId', checkAuth, canEdit, deleteById);

module.exports = router;
