const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../../controllers/measure');

router.get('/measures', getAll);
router.get('/measures/:measureId', getById);
router.put('/measures/:measureId', updateById);
router.post('/measures', createOne);
router.delete('/measures/:clientId', deleteById);

module.exports = router;
