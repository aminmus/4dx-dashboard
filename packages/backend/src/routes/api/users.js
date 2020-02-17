/* eslint-disable no-console */
const router = require('express').Router();
const models = require('../../models');

// GET ALL USERS
router.get('/users', async (_req, res) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - USERS');
  console.log('*************************');
  try {
    const users = await models.User.findAll();
    return res.send(users);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// GET ONE USER
router.get('/users/:userId', async (req, res) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await models.User.findByPk(req.params.userId);
    return res.send(user);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// UPDATE USER
router.put('/users/:userId', async (req, res) => {
  console.log('*************************');
  console.log('PUT REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await models.User.findByPk(req.params.userId);
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    return res.send(user);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// CREATE USER
router.post('/users', async (req, res) => {
  console.log('*************************');
  console.log('POST REQUEST - USERS');
  console.log('*************************');
  try {
    const newUser = await models.User.build(req.body);
    await newUser.save();
    return res.send(newUser);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

// DELETE USER
router.delete('/users/:userId', async (req, res) => {
  console.log('*************************');
  console.log('DELETE REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await models.user.findByPk(req.params.clientId);
    await user.destroy();
    return res.send(user);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
});

module.exports = router;
