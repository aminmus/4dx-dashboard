/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Nps = sequelize.define(
    'Nps',
    {
      currentNps: DataTypes.INTEGER,
      goalNps: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      targetDate: DataTypes.DATEONLY,
    },
    {},
  );
  return Nps;
};
