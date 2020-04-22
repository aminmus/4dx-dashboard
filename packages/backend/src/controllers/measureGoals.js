/**
 * Controller for Measure Goals Routes
 * @module controllers_measure_goals
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
 * Measure Goal model
 * @const
 */
const { MeasureGoal } = require('../models');

/**
 * Serialize Measure Goals according to specified format
 * @const
 */
const MeasureGoalSerializer = new JSONAPISerializer('MeasureGoal', {
  attributes: ['measuresAmount', 'targetDate', 'createdAt', 'updatedAt'],
});

/**
 * Deserialize Measure Goals with camelCase formatting
 * @const
 */
const MeasureGoalDeserializer = new JSONAPIDeserializer({
  keyForAttribute: 'camelCase',
});

/**
 * GET All Measure Goals
 * @function
 * @memberof module:controllers_measure_goals
 * @param {Object} _req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const getAll = async (_req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - Measure Goal');
  console.log('*************************');
  try {
    const measureGoal = await MeasureGoal.findAll();
    return res
      .status(200)
      .json(MeasureGoalSerializer.serialize(measureGoal));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * GET One Measure Goal by Id
 * @function
 * @memberof module:controllers_measure_goals
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - Measure Goal');
  console.log('*************************');
  try {
    const measureGoal = await MeasureGoal.findByPk(
      req.params.measureGoalId,
    );
    if (!measureGoal) {
      return res.status(404).json({
        error: { title: 'Measure Goal entry not found' },
        data: null,
      });
    }
    return res
      .status(200)
      .json(MeasureGoalSerializer.serialize(measureGoal));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * UPDATE One Measure Goal by Id
 * @function
 * @memberof module:controllers_measure_goals
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - Measure Goal');
  console.log('*************************');
  try {
    const measureGoal = await MeasureGoal.findByPk(
      req.params.measureGoalId,
    );
    if (!measureGoal) {
      return res.status(404).json({
        error: { title: 'Measure Goal not found' },
        data: null,
      });
    }
    const deserializedMeasureGoal = await MeasureGoalDeserializer.deserialize(
      req.body,
    );
    await measureGoal.update(deserializedMeasureGoal);
    return res
      .status(200)
      .json(MeasureGoalSerializer.serialize(measureGoal));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * CREATE One Measure Goal
 * @function
 * @memberof module:controllers_measure_goals
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - Measure Goal');
  console.log('*************************');
  try {
    const {
      measuresAmount,
      targetDate,
    } = await MeasureGoalDeserializer.deserialize(req.body);

    const measureGoal = await MeasureGoal.create({
      measuresAmount,
      targetDate,
    });

    return res
      .status(201)
      .json(MeasureGoalSerializer.serialize(measureGoal));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * DELETE One Measure Goal
 * @function
 * @memberof module:controllers_measure_goals
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - Measure Goal');
  console.log('*************************');
  try {
    const measureGoal = await MeasureGoal.findByPk(
      req.params.measureGoalId,
    );
    if (!measureGoal) {
      return res.status(404).json({
        error: { title: 'Measure Goal not found' },
        data: null,
      });
    }
    await measureGoal.destroy();
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
