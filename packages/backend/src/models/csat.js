/* eslint-disable func-names */

/**
 * Csat Model
 * @module model_csat
 */

/**
 * Return Sequelize Csat Model
 * @param {Object} sequelize - sequelize module
 * @param {Object} DataTypes - Type definitions for model properties
 */
module.exports = (sequelize, DataTypes) => {
  const Csat = sequelize.define(
    'Csat',
    {
      score: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
    },
    {},
  );
  Csat.associate = function (models) {
    Csat.belongsTo(models.Client);
  };
  return Csat;
};
