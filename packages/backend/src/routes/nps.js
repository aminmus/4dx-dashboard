const router = require('express').Router();
const {
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
} = require('../controllers/nps');
const { checkAuth } = require('../middleware/authentication');
const { canEdit } = require('../middleware/permissions');

router.get('/', getAll);
router.get('/:npsId', getById);

// Protected routes
router.put('/:npsId', checkAuth, canEdit, updateById);
router.post('/', checkAuth, canEdit, createOne);
router.delete('/:npsId', checkAuth, canEdit, deleteById);

module.exports = router;
