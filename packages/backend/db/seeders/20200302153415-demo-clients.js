/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients',
      [{
        name: 'TechFlake Corporation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Saltium & Co',
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);

      const clients = await Sequelize.model('Client').findOne()
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Clients',
    {},
    {}),
};
