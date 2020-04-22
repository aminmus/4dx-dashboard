/* eslint-disable func-names */

/**
 * Client Model
 * @module Model_client
 */

/**
 * Return Sequelize Client Model
 * @param {Object} sequelize - sequelize module
 * @param {Object} DataTypes - Type definitions for model properties
 */

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
