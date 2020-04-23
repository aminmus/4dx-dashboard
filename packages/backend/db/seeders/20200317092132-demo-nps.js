/**
 * Seeder for demo nps data
 * @module Seeder_demo_nps
 */

/**
 * Generate Nps data from inputs
 * @function
 * @memberof module: Seeder_demo_nps
 * @param {Number} currentNps
 * @param {Number} goalNps
 * @param {String} date
 * @param {String} targetDate
 */
const generateNps = (currentNps, goalNps, date, targetDate) => ({
    currentNps,
    goalNps,
    date: new Date(date),
    targetDate: new Date(targetDate),
    createdAt: new Date(),
    updatedAt: new Date()
});

module.exports = {
    /**
     * Create Demo Nps Data
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} _Sequelize - _Sequelize Object
     */
    up: async (queryInterface, _Sequelize) =>
        queryInterface.bulkInsert('Nps', [
            generateNps(8, 12, '2019-11-01', '2019-11-30'),
            generateNps(5, 10, '2019-12-01', '2019-12-31'),
            generateNps(9, 12, '2020-01-01', '2020-01-31'),
            generateNps(12, 15, '2020-02-01', '2020-02-28'),
            generateNps(13, 15, '2020-03-01', '2020-03-31')
        ]),
    /**
     * Remove Demo Nps Data
     * @param {Object} queryInterface - Query interface for handling database operations
     * @param {Object} _Sequelize - Sequelize Object
     */
    down: (queryInterface, _Sequelize) =>
        queryInterface.bulkDelete('Nps', {}, {})
};
