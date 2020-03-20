module.exports = (sequelize, DataTypes) => {
  const MeasureGoal = sequelize.define('MeasureGoal', {
    measuresAmount: DataTypes.INTEGER,
    targetDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {});
  return MeasureGoal;
};
