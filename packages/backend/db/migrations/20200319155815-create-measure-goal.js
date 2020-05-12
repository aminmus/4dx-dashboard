/**
 * Migration for creating Measure Success Table
 * @module Migrations_measure_success_table
 */
module.exports = {
  /**
     * Create Measure Success Table
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} Sequelize - Sequelize Object
     */
  up: (queryInterface, Sequelize) => queryInterface.createTable('MeasureGoals', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    measuresAmount: {
      type: Sequelize.INTEGER,
    },
    targetDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  /**
     * Remove Measure Success Table
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} _Sequelize - Sequelize Object
     */
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('MeasureGoals'),
};
