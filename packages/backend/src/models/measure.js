/* eslint-disable func-names */

/**
 * Measure Model
 * @module model_measure
 */

/**
 * Return Sequelize Measure Model
 * @param {Object} sequelize - sequelize module
 * @param {Object} DataTypes - Type definitions for model properties
 */
module.exports = (sequelize, DataTypes) => {
  const Measure = sequelize.define(
    'Measure',
    {
      description: DataTypes.STRING,
      success: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
      },
    },
    {},
  );
  Measure.associate = function (models) {
    Measure.belongsTo(models.Client);
  };
  return Measure;
};
