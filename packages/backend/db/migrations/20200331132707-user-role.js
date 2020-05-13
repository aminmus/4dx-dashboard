
/**
 * Migration for creating Users role property
 * @module Migrations_user_role
 */
module.exports = {
  /**
     * Update User table with role property
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} Sequelize - Sequelize Object
     */
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'role', {
    type: Sequelize.STRING,
    allowNull: false,
  }),
  /**
     * Remove User role property
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} _Sequelize - Sequelize Object
     */
  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('Users', 'role'),
};
