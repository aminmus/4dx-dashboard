module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('MeasureGoals', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    measuresAmount: {
      type: Sequelize.INTEGER,
    },
    targetDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('MeasureGoals'),
};
