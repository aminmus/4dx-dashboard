/* eslint-disable no-param-reassign */
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const hashPassword = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
};

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
