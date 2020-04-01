const bcrypt = require('bcryptjs');

module.exports = {
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
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {})
};
