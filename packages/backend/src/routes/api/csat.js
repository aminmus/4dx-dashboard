const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../../controllers/csat');

router.get('/csat', getAll);
router.get('/csat/:csatId', getById);
router.put('/csat/:csatId', updateById);
router.post('/csat', createOne);
router.delete('/csat/:clientId', deleteById);

module.exports = router;
