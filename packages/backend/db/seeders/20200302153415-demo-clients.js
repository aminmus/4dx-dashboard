/* eslint-disable no-unused-vars */
const { Client } = require('../../src/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkInsert('Clients',
      [{
        name: 'TechFlake Corporation',
        createdAt: date,
        updatedAt: date,
      },
      {
        name: 'Saltium & Co',
        createdAt: date,
        updatedAt: date,
      }]);
    const clients = [
      await Client.findOne({ where: { name: 'TechFlake Corporation' } }),
      await Client.findOne({ where: { name: 'Saltium & Co' } }),
    ];

    await queryInterface.bulkInsert('Measures',
      [{
        description: 'Meet client',
        success: true,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[0].dataValues.id,
      },
      {
        description: 'Discuss client vision',
        success: false,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[0].dataValues.id,
      },
      {
        description: 'Have the first planning meeting',
        success: true,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[1].dataValues.id,
      },
      {
        description: 'Deliver excellence',
        success: true,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[1].dataValues.id,
      },
      {
        description: 'Have a fika with client',
        success: false,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[1].dataValues.id,
      }]);

    return queryInterface.bulkInsert('Csats',
      [{
        score: 3,
        date,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[0].dataValues.id,
      },
      {
        score: 6,
        date,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[0].dataValues.id,
      },
      {
        score: 7,
        date,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[1].dataValues.id,
      },
      {
        score: 8,
        date,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[1].dataValues.id,
      },
      {
        score: 10,
        date,
        createdAt: date,
        updatedAt: date,
        ClientId: clients[1].dataValues.id,
      }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients', {}, {});
    await queryInterface.bulkDelete('Measures', {}, {});
    await queryInterface.bulkDelete('Csats', {}, {});
  },
};
