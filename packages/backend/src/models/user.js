/* eslint-disable no-param-reassign */

/**
 * User Model
 * @module model_user
 * @requires sequelize
 * @requires bcryptjs
 */

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

/**
 * Hash user password with brypt
 * @function
 * @memberof module:model_user
 * @param {Object} user
 */
const hashPassword = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
};

/**
 * Return Sequelized User Model with hashed password
 * @param {Object} sequelize - sequelize module
 * @param {Object} DataTypes - Type definitions for model properties
 */
module.exports = (sequelize, DataTypes) => {
  class User extends Sequelize.Model {
    isValidPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
      },
      password: {
        type: DataTypes.STRING,
        required: true,
      },
      role: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    { sequelize },
  );

  User.associate = function (_models) {
    // associations can be defined here
  };

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
