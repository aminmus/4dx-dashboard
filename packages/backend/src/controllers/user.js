const { Serializer: JSONAPISerializer, Deserializer: JSONAPIDeserializer } = require('jsonapi-serializer');
const { User } = require('../models');

const UserSerializer = new JSONAPISerializer('users', {
  attributes: ['email', 'password', 'createdAt', 'updatedAt'],
});
const UserDeserializer = new JSONAPIDeserializer('users', {
  attributes: ['email', 'password', 'createdAt', 'updatedAt'],
});

const getAll = async (_req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - USERS');
  console.log('*************************');
  try {
    const users = await User.findAll();
    return res.status(200).json(UserSerializer.serialize(users));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: { title: 'User not found' }, data: null });
    return res.status(200).json(UserSerializer.serialize(user));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: { title: 'User not found' }, data: null });
    await user.update(await UserDeserializer.deserialize(req.body));
    return res.status(200).json(UserSerializer.serialize(user));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - USERS');
  console.log('*************************');
  try {
    const { email, password } = await UserDeserializer.deserialize(req.body);
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: { email, password },
    });
    if (!isCreated && user) return res.status(409).json({ error: { title: 'User already exists' }, data: null });

    return res.status(201).json(UserSerializer.serialize(user));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: { title: 'User not found' }, data: null });
    await user.destroy();
    return res.status(204).send();
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

module.exports = {
  createOne, deleteById, getAll, getById, updateById,
};
