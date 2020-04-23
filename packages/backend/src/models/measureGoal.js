/**
 * Measure Goal Model
 * @module Model_measure_goal
 */

/**
 * Return Sequelize Measure Goal Model
 * @param {Object} sequelize - sequelize module
 * @param {Object} DataTypes - Type definitions for model properties
 */
module.exports = (sequelize, DataTypes) => {
  const MeasureGoal = sequelize.define(
    'MeasureGoal',
    {
      measuresAmount: DataTypes.INTEGER,
      targetDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {},
  );
  return MeasureGoal;
};
