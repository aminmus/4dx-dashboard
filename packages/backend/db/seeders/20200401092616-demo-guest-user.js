/**
 * Seeder for demo guest user
 * @module Seeder_demo_user_guest
 * @requires  bcryptjs
 */

/**
 * bcrypt module for password hasshing
 * @const
 */
const bcrypt = require('bcryptjs');

module.exports = {
    /**
     * Create Demo User with Guest Role
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} _Sequelize - Sequelize Object
     */
    up: async (queryInterface, _Sequelize) =>
        queryInterface.bulkInsert('Users', [
            {
                email: 'guest@example.com',
                password: await bcrypt.hash('guest', 10),
                role: 'guest',
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
        queryInterface.bulkDelete('Users', { email: 'guest@example.com' }, {})
};
