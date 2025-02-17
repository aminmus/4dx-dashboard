/**
 * Controller for Client Routes
 * @module Controllers_client
 * @requires Model_client
 */

const {
  Serializer: JSONAPISerializer,
  Deserializer: JSONAPIDeserializer,
} = require('jsonapi-serializer');

const { Client } = require('../models');

/**
 * For Serializing according to specified format
 */
const ClientSerializer = new JSONAPISerializer('Clients', {
  attributes: ['name', 'createdAt', 'updatedAt', 'Csats', 'Measures'],
  Csats: {
    attributes: ['score', 'date', 'createdAt', 'updatedAt'],
    ref: 'id',
  },
  Measures: {
    attributes: ['description', 'success', 'createdAt', 'updatedAt'],
    ref: 'id',
  },
});

/**
 * For deserializing with camelCase formatting
 */
const ClientDeserializer = new JSONAPIDeserializer({
  keyForAttribute: 'camelCase',
});

/**
 * GET All Clients
 * @function
 * @memberof module:Controllers_client
 * @param {Object} _req Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Express middleware.
 */
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
    return next(err);
  }
};

/**
 * GET One Client by Id
 * @function
 * @memberof module:Controllers_client
 * @param {Object} req Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Express middleware.
 */
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

/**
 * UPDATE One Client by Id
 * @function
 * @memberof module:Controllers_client
 * @param {Object} req Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Express middleware.
 */
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

/**
 * CREATE One Client
 * @function
 * @memberof module:Controllers_client
 * @param {Object} req Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Express middleware.
 */
const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - CLIENTS');
  console.log('*************************');
  try {
    /**
         * Client name
         * @const
         */
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

/**
 * DELETE One Client
 * @function
 * @memberof module:Controllers_client
 * @param {Object} req Request Object
 * @param {Object} res - Response Object
 * @param {Function} next - Express middleware.
 */
const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - CLIENTS');
  console.log('*************************');
  try {
    const client = await Client.findByPk(req.params.clientId);
    if (!client) {
      return res
        .status(404)
        .json({ error: { title: 'Client not found' }, data: null });
    }
    await client.destroy();
    return res.status(204).send();
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
