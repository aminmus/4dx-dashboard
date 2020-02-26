const { Nps } = require('../models');

const getAll = async (_req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findAll();
    return res.send(nps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findByPk(req.params.npsId);
    return res.send(nps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findByPk(req.params.npsId);
    nps.currentNps = req.body.currentNps;
    nps.goalNPS = req.body.goalNPS;
    nps.date = req.body.date;
    nps.targetDate = req.body.targetDate;
    await nps.save();
    return res.send(nps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - NPS');
  console.log('*************************');
  try {
    const newNps = await Nps.build(req.body);
    await newNps.save();
    return res.send(newNps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findByPk(req.params.npsId);
    await nps.destroy();
    return res.send(nps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

module.exports = {
  createOne, deleteById, getAll, getById, updateById,
};
