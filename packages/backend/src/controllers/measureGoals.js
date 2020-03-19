const {
  Serializer: JSONAPISerializer,
  Deserializer: JSONAPIDeserializer,
} = require('jsonapi-serializer');
const { MeasureGoal } = require('../models');

const MeasureGoalSerializer = new JSONAPISerializer('MeasureGoal', {
  attributes: [
    'measuresAmount',
    'targetDate',
    'createdAt',
    'updatedAt',
  ],
});

const MeasureGoalDeserializer = new JSONAPIDeserializer({
  keyForAttribute: 'camelCase',
});

const getAll = async (_req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - Measure Goal');
  console.log('*************************');
  try {
    const measureGoal = await MeasureGoal.findAll();
    return res.status(200).json(MeasureGoalSerializer.serialize(measureGoal));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - Measure Goal');
  console.log('*************************');
  try {
    const measureGoal = await MeasureGoal.findByPk(req.params.measureGoalId);
    if (!measureGoal) {
      return res
        .status(404)
        .json({ error: { title: 'Measure Goal entry not found' }, data: null });
    }
    return res.status(200).json(MeasureGoalSerializer.serialize(measureGoal));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - Measure Goal');
  console.log('*************************');
  try {
    const measureGoal = await MeasureGoal.findByPk(req.params.measureGoalId);
    if (!measureGoal) {
      return res
        .status(404)
        .json({ error: { title: 'Measure Goal not found' }, data: null });
    }
    const deserializedMeasureGoal = await MeasureGoalDeserializer.deserialize(req.body);
    await measureGoal.update(deserializedMeasureGoal);
    return res.status(200).json(MeasureGoalSerializer.serialize(measureGoal));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

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

    return res.status(201).json(MeasureGoalSerializer.serialize(measureGoal));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - Measure Goal');
  console.log('*************************');
  try {
    const measureGoal = await MeasureGoal.findByPk(req.params.measureGoalId);
    if (!measureGoal) {
      return res
        .status(404)
        .json({ error: { title: 'Measure Goal not found' }, data: null });
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
