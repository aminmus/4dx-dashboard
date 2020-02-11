/* eslint-disable no-console */
const router = require('express').Router();
const models = require('../../../models');

// GET ALL CLIENTS
router.get('/clients', async (_req, res) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - CLIENT');
  console.log('*************************');
  try {
    const clients = await models.Client.findAll({
      include: [{ all: true, nested: true }],
    });
    res.send(clients);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.send('error');
  }
});

// GET ONE CLIENT
router.get('/clients/:clientId', async (req, res) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - CLIENT');
  console.log('*************************');
  try {
    const client = await models.Client.findByPk(req.params.clientId, {
      include: [{ all: true, nested: true }],
    });
    res.send(client);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.send('error');
  }
});

// UPDATE CLIENT
router.put('/clients/:clientId', async (req, res) => {
  console.log('*************************');
  console.log('PUT REQUEST - CLIENT');
  console.log('*************************');
  try {
    const client = await models.Client.findByPk(req.params.clientId, {
      include: [{ all: true, nested: true }],
    });
    client.name = req.body.name;
    await client.save();
    res.send(client);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.send('error');
  }
});

// POST CLIENT
router.post('/clients', async (req, res) => {
  console.log('*************************');
  console.log('POST REQUEST - CLIENT');
  console.log('*************************');
  try {
    const newClient = await models.Client.build(req.body);
    await newClient.save();
    console.log('New client saved');
    res.send(newClient);
  } catch (err) {
    console.log(`ERROR on client save: ${err}`);
    res.send('error');
  }
});

// DELETE CLIENT
router.delete('/clients/:clientId', async (req, res) => {
  console.log('*************************');
  console.log('DELETE REQUEST - CLIENT');
  console.log('*************************');
  try {
    const client = await models.Client.findByPk(req.params.clientId);
    await client.destroy();
    return res.send(client);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

module.exports = router;
