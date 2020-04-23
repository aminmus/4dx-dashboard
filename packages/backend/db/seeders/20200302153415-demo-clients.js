/**
 * Seeder for demo clients
 * @module Seeder_demo_clients
 * @requires  ../../src/models/client
 */

const { Client } = require('../../src/models');

module.exports = {
    /**
     * Create Demo Clients
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} _Sequelize - _Sequelize Object
     */
    up: async (queryInterface, _Sequelize) => {
        const date = new Date();

        await queryInterface.bulkInsert('Clients', [
            {
                name: 'TechFlake Corporation',
                createdAt: date,
                updatedAt: date
            },
            {
                name: 'Saltium & Co',
                createdAt: date,
                updatedAt: date
            }
        ]);
        const clients = [
            await Client.findOne({ where: { name: 'TechFlake Corporation' } }),
            await Client.findOne({ where: { name: 'Saltium & Co' } })
        ];

        await queryInterface.bulkInsert('Measures', [
            {
                description: 'Meet client',
                success: date,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[0].dataValues.id
            },
            {
                description: 'Discuss client vision',
                success: null,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[0].dataValues.id
            },
            {
                description: 'Have the first planning meeting',
                success: date,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[1].dataValues.id
            },
            {
                description: 'Deliver excellence',
                success: date,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[1].dataValues.id
            },
            {
                description: 'Have a fika with client',
                success: null,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[1].dataValues.id
            }
        ]);

        return queryInterface.bulkInsert('Csats', [
            {
                score: 3,
                date,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[0].dataValues.id
            },
            {
                score: 6,
                date,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[0].dataValues.id
            },
            {
                score: 7,
                date,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[1].dataValues.id
            },
            {
                score: 8,
                date,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[1].dataValues.id
            },
            {
                score: 10,
                date,
                createdAt: date,
                updatedAt: date,
                ClientId: clients[1].dataValues.id
            }
        ]);
    },
    /**
     * Remove Demo Clients
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} _Sequelize - Sequelize Object
     */
    down: async (queryInterface, _Sequelize) => {
        await queryInterface.bulkDelete('Clients', {}, {});
        await queryInterface.bulkDelete('Measures', {}, {});
        await queryInterface.bulkDelete('Csats', {}, {});
    }
};
