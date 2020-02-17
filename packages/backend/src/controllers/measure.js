const { Measure } = require('../models');

const getAll = async (req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - MEASURES');
  console.log('*************************');
  let filter = {};
  if (req.query.filter) {
    const queryFilter = JSON.parse(req.query.filter);
    const ClientId = queryFilter.Client_Id;
    filter = {
      where: { ClientId },
    };
  }
  try {
    const measures = await Measure.findAll(filter);
    return res.send(measures);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measure = await Measure.findByPk(req.params.measureId);
    return res.send(measure);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measure = await Measure.findByPk(req.params.measureId);
    measure.description = req.body.description;
    measure.success = req.body.success;
    if (measure.success == null) {
      measure.success = false;
    }
    await measure.save();
    return res.send(measure);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - MEASURES');
  console.log('*************************');
  try {
    const newMeasure = await Measure.build(req.body);
    if (newMeasure.success == null) {
      newMeasure.success = false;
    }
    await newMeasure.save();
    return res.send(newMeasure);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measure = await Measure.findByPk(req.params.clientId);
    await measure.destroy();
    return res.send(measure);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

module.exports = {
  createOne, deleteById, getAll, getById, updateById,
};
