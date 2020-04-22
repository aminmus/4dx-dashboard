/**
 * Controller for Measure Routes
 * @module controllers_measure
 * @requires jsonapi-serializer
 * @requires ../models/measure
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
 * Measure model
 * @const
 */
const { Measure } = require('../models');

/**
 * Serialize Measures according to specified format
 * @const
 */
const MeasureSerializer = new JSONAPISerializer('Measures', {
  attributes: ['description', 'success', 'createdAt', 'updatedAt', 'Client'],
  Client: {
    attributes: ['name', 'createdAt', 'updatedAt', 'Csats', 'Measures'],
    ref: 'id',
  },
});

/**
 * Deserialize Measures with camelCase formatting
 * @const
 */
const MeasureDeserializer = new JSONAPIDeserializer({
  keyForAttribute: 'camelCase',
});

/**
 * GET All Measures
 * @function
 * @memberof module:controllers_measure
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const getAll = async (req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - MEASURES');
  console.log('*************************');
  try {
    const opts = { include: [{ all: true, nested: true }] };
    if (req.query.filter && req.query.filter.clientId) {
      opts.where = { ClientId: req.query.filter.clientId };
    }
    const measures = await Measure.findAll(opts);
    return res.status(200).json(MeasureSerializer.serialize(measures));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * GET One Measure by Id
 * @function
 * @memberof module:controllers_measure
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measure = await Measure.findByPk(req.params.measureId, {
      include: [{ all: true, nested: true }],
    });
    if (!measure) {
      return res
        .status(404)
        .json({ error: { title: 'Measure not found' }, data: null });
    }
    return res.status(200).json(MeasureSerializer.serialize(measure));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * UPDATE One Measure by Id
 * @function
 * @memberof module:controllers_measure
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measure = await Measure.findByPk(req.params.measureId);
    if (!measure) {
      return res
        .status(404)
        .json({ error: { title: 'Measure not found' }, data: null });
    }

    const deserializedMeasure = await MeasureDeserializer.deserialize(
      req.body,
    );
    await measure.update(deserializedMeasure);

    return res.status(200).json(MeasureSerializer.serialize(measure));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * CREATE One Measure
 * @function
 * @memberof module:controllers_measure
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - MEASURES');
  console.log('*************************');
  try {
    const {
      description,
      success,
      clientId: ClientId,
    } = await MeasureDeserializer.deserialize(req.body);
    const measure = await Measure.create({
      description,
      success,
      ClientId,
    });
    return res.status(201).json(MeasureSerializer.serialize(measure));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * DELETE One Measure
 * @function
 * @memberof module:controllers_measure
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measure = await Measure.findByPk(req.params.measureId);
    if (!measure) {
      return res
        .status(404)
        .json({ error: { title: 'Measure not found' }, data: null });
    }
    await measure.destroy();
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
