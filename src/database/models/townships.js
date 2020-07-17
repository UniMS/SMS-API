/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('townships', {
		townshipId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'township_id'
		},
		regionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'regions',
				key: 'region_id'
			},
			field: 'region_id'
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'name'
		}
	}, {
		tableName: 'townships'
	});
};
