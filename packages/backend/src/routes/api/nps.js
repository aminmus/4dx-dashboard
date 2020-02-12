/* eslint-disable no-console */
const router = require('express').Router();
const models = require('../../../models');

// GET ALL NPS
router.get('/nps', async (_req, res) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await models.Nps.findAll();
    return res.send(nps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// GET ONE NPS
router.get('/nps/:npsId', async (req, res) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await models.Nps.findByPk(req.params.npsId);
    return res.send(nps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// UPDATE NPS
router.put('/nps/:npsId', async (req, res) => {
  console.log('*************************');
  console.log('PUT REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await models.Nps.findByPk(req.params.npsId);
    nps.currentNPS = req.body.currentNPS;
    nps.goalNPS = req.body.goalNPS;
    nps.date = req.body.date;
    nps.targetDate = req.body.targetDate;
    await nps.save();
    return res.send(nps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// POST NPS
router.post('/nps', async (req, res) => {
  console.log('*************************');
  console.log('POST REQUEST - NPS');
  console.log('*************************');
  try {
    const newNps = await models.Nps.build(req.body);
    await newNps.save();
    return res.send(newNps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// DELETE NPS
router.delete('/nps/:npsId', async (req, res) => {
  console.log('*************************');
  console.log('DELETE REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await models.Nps.findByPk(req.params.npsId);
    await nps.destroy();
    return res.send(nps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

module.exports = router;
