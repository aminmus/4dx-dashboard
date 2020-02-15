const { User } = require('../../models');

const getAll = async (_req, res) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - USERS');
  console.log('*************************');
  try {
    const users = await User.findAll();
    return res.send(users);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
};

const getById = async (req, res) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await User.findByPk(req.params.userId);
    return res.send(user);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
};

const updateById = async (req, res) => {
  console.log('*************************');
  console.log('PUT REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await User.findByPk(req.params.userId);
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    return res.send(user);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
};

const createOne = async (req, res) => {
  console.log('*************************');
  console.log('POST REQUEST - USERS');
  console.log('*************************');
  try {
    const newUser = await User.build(req.body);
    await newUser.save();
    return res.send(newUser);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
};

const deleteById = async (req, res) => {
  console.log('*************************');
  console.log('DELETE REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await User.findByPk(req.params.clientId);
    await user.destroy();
    return res.send(user);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return res.send('error');
  }
};

module.exports = {
  createOne, deleteById, getAll, getById, updateById,
};
