/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Measures',
    [{
      description: 'Meet client',
      success: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ClientId: 1,
    },
    {
      description: 'Discuss client vision',
      success: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ClientId: 1,
    },
    {
      description: 'Have the first planning meeting',
      success: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ClientId: 2,
    },
    {
      description: 'Deliver excellence',
      success: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ClientId: 2,
    },
    {
      description: 'Drink coffee (or tea)',
      success: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ClientId: 2,
    }]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Measures',
    {},
    {}),
};
