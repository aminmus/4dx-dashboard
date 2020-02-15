const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../../controllers/nps');

router.get('/nps', getAll);
router.get('/nps/:npsId', getById);
router.put('/nps/:npsId', updateById);
router.post('/nps', createOne);
router.delete('/nps/:npsId', deleteById);

module.exports = router;
