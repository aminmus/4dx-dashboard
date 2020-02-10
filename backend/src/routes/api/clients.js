const router = require('express').Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const fs = require('fs');

const db = require('../../../models/index');

const Client = db.sequelize.import('../../../models/client');
const Measure = db.sequelize.import('../../../models/measure');
const data = require('../../../data.json');

// Helper Functions
function updateClient(newClient) {
  const newClientData = data.clients.map((client) => (client.id === newClient.id ? newClient : client));
  data.clients = newClientData;

  try {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.log(err);
  }
}

function createClient(newClient) {
  let maxId = 0;

  data.clients.map((client) => (client.id > maxId ? (maxId = client.id) : maxId++));
  newClient.id = maxId;
  data.clients.push(newClient);
  try {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.log(err);
  }
}

function deleteClient(clientId) {
  data.clients = data.clients.filter((client) => client.id !== clientId);
  try {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.log(err);
  }
}

// GET SINGLE CLIENT
router.get('/clients/:id', (_req, res) => {
  console.log('FETCH ONE REQUEST');
  res.setHeader('X-Total-Count', '30');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  res.send(data.clients[_req.params.id]);
});

// From database, TODO: change route path to something fitting later
router.get('/clientsfromdatabase', async (_req, res) => {
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

// GET ALL CLIENTS
router.get('/clients', (_req, res) => {
  console.log('FETCH ALL REQUEST');
  res.setHeader('X-Total-Count', '30');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  res.send(data.clients);
});
// UPDATE CLIENT
router.put('/clients/:id', jsonParser, (_req, res) => {
  console.log('PUT REQUEST');
  const client = data.clients[_req.params.id];
  updateClient(_req.body);
  return res.send(client);
});

// POST CLIENT
router.post('/clients', jsonParser, (_req, res) => {
  console.log('POST REQUEST');
  createClient(_req.body);
  return res.send(_req.body);
});

// DELETE CLIENT
router.delete('/clients/:id', (_req, res) => {
  console.log('DELETE REQUEST');
  const client = data.clients[_req.params.id];
  deleteClient(_req.params.id);
  return res.send(client);
});

module.exports = router;
