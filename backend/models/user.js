
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {},
  );
  User.associate = function (_models) {
    // associations can be defined here
  };
  return User;
};
