/**
 * Seeder for demo admin user
 * @module Seeder_demo_user_admin
 * @requires  bcryptjs
 */

/**
 * bcrypt module for password hasshing
 * @const
 */
const bcrypt = require('bcryptjs');

module.exports = {
    /**
     * Create Demo User with Admin Role
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} _Sequelize - Sequelize Object
     */
    up: async (queryInterface, _Sequelize) =>
        queryInterface.bulkInsert('Users', [
            {
                email: 'admin@example.com',
                password: await bcrypt.hash('admin', 10),
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]),
    /**
     * Remove Demo User
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} _Sequelize - Sequelize Object
     */
    down: (queryInterface, _Sequelize) =>
        queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {})
};
