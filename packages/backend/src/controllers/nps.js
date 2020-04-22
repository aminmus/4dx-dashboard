/**
 * Controller for Nps Satisfaction Score Routes
 * @module controllers_nps
 * @requires jsonapi-serializer
 * @requires ../models/nps
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
 * Nps model
 * @const
 */
const { Nps } = require('../models');

/**
 * Serialize Nps according to specified format
 * @const
 */
const NpsSerializer = new JSONAPISerializer('Nps', {
  attributes: [
    'currentNps',
    'goalNps',
    'date',
    'targetDate',
    'createdAt',
    'updatedAt',
  ],
});

/**
 * Deserialize Nps with camelCase formatting
 * @const
 */
const NpsDeserializer = new JSONAPIDeserializer({
  keyForAttribute: 'camelCase',
});

/**
 * GET All Nps entries
 * @function
 * @memberof module:controllers_nps
 * @param {Object} _req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const getAll = async (_req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findAll();
    return res.status(200).json(NpsSerializer.serialize(nps));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * GET One Nps entry by Id
 * @function
 * @memberof module:controllers_nps
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findByPk(req.params.npsId);
    if (!nps) {
      return res
        .status(404)
        .json({ error: { title: 'Nps entry not found' }, data: null });
    }
    return res.status(200).json(NpsSerializer.serialize(nps));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * UPDATE One Nps entry by Id
 * @function
 * @memberof module:controllers_nps
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findByPk(req.params.npsId);
    if (!nps) {
      return res
        .status(404)
        .json({ error: { title: 'Nps not found' }, data: null });
    }
    const deserializedNps = await NpsDeserializer.deserialize(req.body);
    await nps.update(deserializedNps);
    return res.status(200).json(NpsSerializer.serialize(nps));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * CREATE One Nps entry
 * @function
 * @memberof module:controllers_nps
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - NPS');
  console.log('*************************');
  try {
    const {
      date,
      currentNps,
      goalNps,
      targetDate,
    } = await NpsDeserializer.deserialize(req.body);

    const nps = await Nps.create({
      currentNps,
      goalNps,
      date,
      targetDate,
    });

    return res.status(201).json(NpsSerializer.serialize(nps));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * DELETE One Nps Entry
 * @function
 * @memberof module:controllers_nps
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findByPk(req.params.npsId);
    if (!nps) {
      return res
        .status(404)
        .json({ error: { title: 'Nps not found' }, data: null });
    }
    await nps.destroy();
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
