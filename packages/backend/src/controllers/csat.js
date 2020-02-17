const { Csat } = require('../models');

const getAll = async (req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - CSAT');
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
    const csat = await Csat.findAll(filter);
    return res.send(csat);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - CSAT');
  console.log('*************************');
  try {
    const csat = await Csat.findByPk(req.params.csatId);
    res.send(csat);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    next(err);
  }
};

const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - CSAT');
  console.log('*************************');
  try {
    const csat = await Csat.findByPk(req.params.csatId);
    csat.score = req.body.score;
    csat.date = req.body.date;
    await csat.save();
    return res.send(csat);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - CSAT');
  console.log('*************************');
  try {
    const newCsat = await Csat.build(req.body);
    await newCsat.save();
    return res.send(newCsat);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - CSAT');
  console.log('*************************');
  try {
    const csat = await Csat.findByPk(req.params.clientId);
    await csat.destroy();
    return res.send(csat);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

module.exports = {
  createOne, deleteById, getAll, getById, updateById,
};
