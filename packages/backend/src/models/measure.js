/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Measure = sequelize.define(
    'Measure',
    {
      description: DataTypes.STRING,
      success: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {},
  );
  Measure.associate = function (models) {
    Measure.belongsTo(models.Client);
  };
  return Measure;
};
