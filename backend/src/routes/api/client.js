const router = require('express').Router();
const db = require('../../../models/index');

const Client = db.sequelize.import('../../../models/client');
const Measure = db.sequelize.import('../../../models/measure');

router.get('/clients', async (_req, res) => {
  try {
    const client = await Client.findAll({
      include: [
        {
          model: Measure,
        },
      ],
    });
    return client;
  } catch (error) {
    return res.send({
      'error message': error.message,
      error,
    });
  }
});

module.exports = router;
