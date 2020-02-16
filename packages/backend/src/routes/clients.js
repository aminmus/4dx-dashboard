const router = require('express').Router();
const {
  createOne, deleteById, getAll, getById, updateById,
} = require('../controllers/client');
const { checkAuth } = require('../middleware/auth');

// Require authentication
router.all('/', checkAuth);

router.get('/clients', getAll);
router.get('/clients/:clientId', getById);
router.put('/clients/:clientId', updateById);
router.post('/clients', createOne);
router.delete('/clients/:clientId', deleteById);

module.exports = router;
