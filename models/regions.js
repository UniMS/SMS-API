/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('regions', {
		regionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'region_id'
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'name'
		}
	}, {
		tableName: 'regions'
	});
};
