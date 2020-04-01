const bcrypt = require('bcryptjs');

module.exports = {
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
	down: (queryInterface, Sequelize) =>
		queryInterface.bulkDelete('Users', { email: 'guest@example.com' }, {})
};
