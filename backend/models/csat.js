"use strict";
module.exports = (sequelize, DataTypes) => {
	const Csat = sequelize.define(
		"Csat",
		{
			score: DataTypes.INTEGER,
			date: DataTypes.DATEONLY
		},
		{}
	);
	Csat.associate = function(models) {
		Csat.belongsTo(models.Client);
	};
	return Csat;
};
