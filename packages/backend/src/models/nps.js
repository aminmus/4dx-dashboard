/* eslint-disable func-names */

/**
 * Nps Model
 * @module Model_nps
 */

/**
 * Return Sequelize Nps Model
 * @param {Object} sequelize - sequelize module
 * @param {Object} DataTypes - Type definitions for model properties
 */
module.exports = (sequelize, DataTypes) => {
  const Nps = sequelize.define(
    'Nps',
    {
      currentNps: DataTypes.INTEGER,
      goalNps: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      targetDate: DataTypes.DATEONLY,
    },
    {},
  );
  return Nps;
};
