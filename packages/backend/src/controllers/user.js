const { User } = require('../models');

const getAll = async (_req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - USERS');
  console.log('*************************');
  try {
    const users = await User.findAll();
    return res.status(200).json({
      data: users.map((user) => {
        const { id, ...values } = user.get({ plain: true });
        console.log(values);
        return ({
          type: 'users',
          id,
          attributes: { ...values },
        });
      }),
    });
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
    return res.status(200).json({ data: { type: 'users', ...user.get({ plain: true }) } });
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
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    return res.status(200).json({ data: { type: 'users', ...user.get({ plain: true }) } });
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
    const { email, password } = req.body;
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: { email, password },
    });
    if (!isCreated && user) return res.status(409).json({ error: { title: 'User already exists' }, data: null });
    return res.status(201).json({ data: { type: 'users', ...user.get({ plain: true }) } });
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
