/**
 * Migration for converting Measure success property to date type
 * @module Migrations_measure_success_conversion
 */
module.exports = {
  /**
     * Update Measure Table Success Column
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} Sequelize - Sequelize Object
     */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Measures', 'success');
    return queryInterface.addColumn('Measures', 'success', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
  },
  /**
     * Revert Measure Table Success Column to original state
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} Sequelize - Sequelize Object
     */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Measures', 'success');
    return queryInterface.addColumn('Measures', 'success', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },
};
