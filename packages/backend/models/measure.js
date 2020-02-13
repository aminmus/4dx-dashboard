/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Measure = sequelize.define(
    'Measure',
    {
      description: DataTypes.STRING,
      success: DataTypes.BOOLEAN,
    },
    {},
  );
  Measure.associate = function (models) {
    Measure.belongsTo(models.Client);
  };
  return Measure;
};
