/* eslint-disable no-console, consistent-return */
const { Serializer: JSONAPISerializer, Deserializer: JSONAPIDeserializer } = require('jsonapi-serializer');
const { Client } = require('../models');

const ClientSerializer = new JSONAPISerializer('clients', {
  attributes: ['name', 'createdAt', 'updatedAt', 'csats', 'measures'],
  csats: {
    attributes: ['score', 'date', 'createdAt', 'updatedAt'],
    ref: 'ClientId',
  },
  measures: {
    attributes: ['description', 'success', 'createdAt', 'updatedAt'],
    ref: 'ClientId',
  },
});
const ClientDeserializer = new JSONAPIDeserializer({ keyForAttribute: 'camelCase' });

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

    return res.status(200).json(ClientSerializer.serialize(clients));
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
    if (!client) {
      return res
        .status(404)
        .json({ error: { title: 'Client not found' }, data: null });
    }
    return res.status(200).json(ClientSerializer.serialize(client));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
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
    if (!client) {
      return res
        .status(404)
        .json({ error: { title: 'client not found' }, data: null });
    }
    await client.update(req.body.data.attributes);
    return res.status(200).json(ClientSerializer.serialize(client));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - CLIENTS');
  console.log('*************************');
  try {
    const { name } = await ClientDeserializer.deserialize(req.body);
    const [client, isCreated] = await Client.findOrCreate({
      where: { name },
    });
    if (!isCreated && client) {
      return res.status(409).json({
        error: { title: 'Client by that name already exists' },
        data: null,
      });
    }
    return res.status(201).json(ClientSerializer.serialize(client));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
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
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
};
