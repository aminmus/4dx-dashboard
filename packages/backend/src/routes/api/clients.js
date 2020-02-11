const router = require('express').Router();
const models = require('../../../models');

// GET ALL CLIENTS
router.get('/clients', async (_req, res) => {
  try {
    const clients = await models.Client.findAll({
      include: [{ all: true, nested: true }],
    });
    console.log(JSON.stringify(clients, null, 2));
    res.send(clients);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.send('error');
  }
});

// GET ONE CLIENT
router.get('/clients/:clientId', async (req, res) => {
  try {
    const client = await models.Client.findByPk(req.params.clientId, {
      include: [{ all: true, nested: true }],
    });
    console.log(JSON.stringify(client, null, 2));

    res.send(client);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.send('error');
  }
});

// UPDATE CLIENT
router.put('/clients/:clientId', async (req, res) => {
  try {
    const client = await models.Client.findByPk(req.params.clientId, {
      include: [{ all: true, nested: true }],
    });
    client.name = req.body.name;
    await client.save();
    console.log('client updated');
    res.send(client);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.send('error');
  }
});

// POST CLIENT
router.post('/clients', async (req, res) => {
  try {
    const newClient = await models.Client.build(req.body);
    console.log(req.body);
    await newClient.save();
    console.log('new client saved');
    res.send(newClient);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.send('error');
  }
});

module.exports = router;
