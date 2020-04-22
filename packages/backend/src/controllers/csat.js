/**
 * Controller for Client Satisfaction Score Routes
 * @module controllers_csat
 * @requires jsonapi-serializer
 * @requires ../models/client
 */

const {
  /**
     * Serialize JSON Data
     * @const
     */
  Serializer: JSONAPISerializer,
  /**
     * Deserialize JSON Data
     * @const
     */
  Deserializer: JSONAPIDeserializer,
} = require('jsonapi-serializer');

/**
 * Csat model
 * @const
 */
const { Csat } = require('../models');

/**
 * Serialize Csat according to specified format
 * @const
 */
const CsatSerializer = new JSONAPISerializer('Csats', {
  attributes: ['score', 'date', 'Client'],
  Client: {
    attributes: ['name', 'createdAt', 'updatedAt', 'Csats', 'Measures'],
    ref: 'id',
  },
});

/**
 * Deserialize Csat with camelCase formatting
 * @const
 */
const CsatDeserializer = new JSONAPIDeserializer({
  keyForAttribute: 'camelCase',
});

/**
 * GET All Csats
 * @function
 * @memberof module:controllers_csat
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const getAll = async (req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - CSAT');
  console.log('*************************');
  try {
    const opts = { include: [{ all: true, nested: true }] };
    if (req.query.filter && req.query.filter.clientId) {
      opts.where = { ClientId: req.query.filter.clientId };
    }
    const csats = await Csat.findAll(opts);
    return res.status(200).json(CsatSerializer.serialize(csats));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * GET One Csat by Id
 * @function
 * @memberof module:controllers_csat
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - CSAT');
  console.log('*************************');
  try {
    const csat = await Csat.findByPk(req.params.csatId, {
      include: [{ all: true, nested: true }],
    });
    if (!csat) {
      return res
        .status(404)
        .json({ error: { title: 'Csat not found' }, data: null });
    }
    return res.status(200).json(CsatSerializer.serialize(csat));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * UPDATE One Csat by Id
 * @function
 * @memberof module:controllers_csat
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - CSAT');
  console.log('*************************');
  try {
    const csat = await Csat.findByPk(req.params.csatId, {
      include: [{ all: true, nested: true }],
    });
    if (!csat) {
      return res
        .status(404)
        .json({ error: { title: 'Csat not found' }, data: null });
    }
    await csat.update(await CsatDeserializer.deserialize(req.body));
    return res.status(200).json(CsatSerializer.serialize(csat));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * CREATE One Csat
 * @function
 * @memberof module:controllers_csat
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - CSAT');
  console.log('*************************');
  try {
    const {
      date,
      score,
      clientId: ClientId,
    } = await CsatDeserializer.deserialize(req.body);
    const csat = await Csat.create({
      date,
      score,
      ClientId,
    });
    return res.status(201).json(CsatSerializer.serialize(csat));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * DELETE One Csat
 * @function
 * @memberof module:controllers_csat
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - CSAT');
  console.log('*************************');
  try {
    const csat = await Csat.findByPk(req.params.csatId);
    if (!csat) {
      return res
        .status(404)
        .json({ error: { title: 'Csat not found' }, data: null });
    }
    await csat.destroy();
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
