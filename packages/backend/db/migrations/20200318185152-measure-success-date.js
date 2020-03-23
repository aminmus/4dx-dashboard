module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Measures', 'success');
    return queryInterface.addColumn('Measures', 'success', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Measures', 'success');
    return queryInterface.addColumn('Measures', 'success', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },
};
