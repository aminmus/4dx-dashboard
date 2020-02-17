const { Client } = require('../models');

const getAll = async (_req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - CLIENTS');
  console.log('*************************');
  try {
    const clients = await Client.findAll({
      include: [{ all: true, nested: true }],
    });
    res.send(clients);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    next(err);
  }
};

const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - CLIENTS');
  console.log('*************************');
  try {
    const client = await Client.findByPk(req.params.clientId, {
      include: [{ all: true, nested: true }],
    });
    res.send(client);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    next(err);
  }
};

const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - CLIENTS');
  console.log('*************************');
  try {
    const client = await Client.findByPk(req.params.clientId, {
      include: [{ all: true, nested: true }],
    });
    client.name = req.body.name;
    await client.save();
    res.send(client);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    next(err);
  }
};

const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - CLIENTS');
  console.log('*************************');
  try {
    const newClient = await Client.build(req.body);
    await newClient.save();
    console.log('New client saved');
    res.send(newClient);
  } catch (err) {
    console.log(`ERROR on client save: ${err}`);
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - CLIENTS');
  console.log('*************************');
  try {
    const client = await Client.findByPk(req.params.clientId);
    await client.destroy();
    return res.send(client);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

module.exports = {
  createOne, deleteById, getAll, getById, updateById,
};
