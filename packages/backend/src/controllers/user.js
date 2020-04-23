/**
 * Controller for User Routes
 * @module Controllers_user
 * @requires jsonapi-serializer
 * @requires ../models/user
 */

const {
  /**
     * Serialize JSON Data
     * @const
     */
  Serializer: JSONAPISerializer,
  /**
     * Deserialize JSON Data
     * @const
     */
  Deserializer: JSONAPIDeserializer,
} = require('jsonapi-serializer');

/**
 * User model
 * @const
 */
const { User } = require('../models');

/**
 * Serialize User according to specified format
 * @const
 */
const UserSerializer = new JSONAPISerializer('Users', {
  attributes: ['email', 'createdAt', 'updatedAt'],
});

/**
 * Deserialize User with camelCase formatting
 * @const
 */
const UserDeserializer = new JSONAPIDeserializer('users', {
  keyForAttribute: 'camelCase',
});

/**
 * GET All Users
 * @function
 * @memberof module:Controllers_user
 * @param {Object} _req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
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

/**
 * GET One User by Id
 * @function
 * @memberof module:Controllers_user
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: { title: 'User not found' }, data: null });
    }
    return res.status(200).json(UserSerializer.serialize(user));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * UPDATE One User by Id
 * @function
 * @memberof module:Controllers_user
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: { title: 'User not found' }, data: null });
    }
    await user.update(await UserDeserializer.deserialize(req.body));
    return res.status(200).json(UserSerializer.serialize(user));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * CREATE One User
 * @function
 * @memberof module:Controllers_user
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - USERS');
  console.log('*************************');
  try {
    const { email, password } = await UserDeserializer.deserialize(
      req.body,
    );
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: { email, password },
    });
    if (!isCreated && user) {
      return res
        .status(409)
        .json({ error: { title: 'User already exists' }, data: null });
    }

    return res.status(201).json(UserSerializer.serialize(user));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

/**
 * DELETE One User
 * @function
 * @memberof module:Controllers_user
 * @param {Object} req Request Object
 * @param {Object} res - Express Request Object
 * @param {Function} next - Express middleware.
 */
const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - USERS');
  console.log('*************************');
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: { title: 'User not found' }, data: null });
    }
    await user.destroy();
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
