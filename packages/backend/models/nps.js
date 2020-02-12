module.exports = (sequelize, DataTypes) => {
	const Nps = sequelize.define(
		"Nps",
		{
			currentNPS: DataTypes.INTEGER,
			goalNPS: DataTypes.INTEGER,
			date: DataTypes.DATEONLY,
			targetDate: DataTypes.DATEONLY
		},
		{}
	);
	return Nps;
};
