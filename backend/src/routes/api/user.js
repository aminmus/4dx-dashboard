const router = require('express').Router();
const db = require('../../../models/index');

const User = db.sequelize.import('../../../models/user');

router.get('/users', async (_req, res) => {
  const users = await User.findAll();
  res.send(users);
});

module.exports = router;
