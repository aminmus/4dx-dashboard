/* eslint-disable no-console */
const router = require('express').Router();
const models = require('../../../models');

// GET ALL MEASURES
router.get('/measures', async (req, res) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - MEASURE');
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
    const measures = await models.Measure.findAll(filter);
    return res.send(measures);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// GET ONE MEASURE
router.get('/measures/:measureId', async (req, res) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - MEASURE');
  console.log('*************************');
  try {
    const measure = await models.Measure.findByPk(req.params.measureId);
    return res.send(measure);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// UPDATE MEASURE
router.put('/measures/:measureId', async (req, res) => {
  console.log('*************************');
  console.log('PUT REQUEST - MEASURE');
  console.log('*************************');
  try {
    const measure = await models.Measure.findByPk(req.params.measureId);
    measure.description = req.body.description;
    measure.success = req.body.success;
    if (measure.success == null) {
      measure.success = false;
    }
    await measure.save();
    return res.send(measure);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// POST MEASURE
router.post('/measures', async (req, res) => {
  console.log('*************************');
  console.log('POST REQUEST - MEASURE');
  console.log('*************************');
  try {
    const newMeasure = await models.Measure.build(req.body);
    if (newMeasure.success == null) {
      newMeasure.success = false;
    }
    await newMeasure.save();
    return res.send(newMeasure);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// DELETE MEASURE
router.delete('/measures/:clientId', async (req, res) => {
  console.log('*************************');
  console.log('DELETE REQUEST - MEASURE');
  console.log('*************************');
  try {
    const measure = await models.Measure.findByPk(req.params.clientId);
    await measure.destroy();
    return res.send(measure);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

module.exports = router;
