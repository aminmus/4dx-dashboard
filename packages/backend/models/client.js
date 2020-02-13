/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      name: DataTypes.STRING,
    },
    {},
  );
  Client.associate = function (models) {
    Client.hasMany(models.Csat);
    Client.hasMany(models.Measure);
  };
  return Client;
};
